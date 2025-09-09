/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventManager, ForgeClient, ForgeExtension, Logger } from '@tryforge/forgescript';
import { ForgeSocialEventManagerName } from './constants';
import { ForgeSocialCommandManager } from './structures/ForgeSocialCommandManager';
import { IForgeSocialEvents } from './structures/ForgeSocialEventHandlers';
import { TypedEmitter } from 'tiny-typed-emitter';

import {
  loadTrackedSubredditsFromFile,
  startPollingTrackedSubreddits,
} from './natives/pollSubreddit';

import {
  loadTrackedChannelsFromFile,
  startPollingTrackedChannels,
} from './natives/pollYoutube';

import https from 'https';
import { Innertube, Log, UniversalCache, ClientType } from 'youtubei.js';
import { Octokit } from '@octokit/rest';
import { redact } from './utils/redact';

/* -------------------------------------------------------------------------- */
/*                                Type Options                                */
/* -------------------------------------------------------------------------- */

/**
 * Options for configuring the ForgeSocial extension.
 */
export interface IForgeSocialOptions {
  events?: Array<keyof IForgeSocialEvents>;
  reddit?: {
    clientID: string;
    clientSecret: string;
    redditUsername: string;
  };
  github?: {
    token: string;
    log?: boolean;
  };
  youtube?: {
    enabled: boolean;
    cookie?: string;
    client?: ClientType;
    userAgent?: string;
    poToken?: string;
    cache?: boolean;
    log?: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'NONE';
  };
}

/**
 * Utility type to transform event signatures for TypedEmitter.
 */
export type TransformEvents<T> = {
  [P in keyof T]: T[P] extends unknown[] ? (...args: T[P]) => void : never;
};

/* -------------------------------------------------------------------------- */
/*                              ForgeSocial Class                             */
/* -------------------------------------------------------------------------- */

/**
 * ForgeSocial extension for ForgeScript.
 * Provides Reddit, GitHub, and YouTube integrations.
 */
export class ForgeSocial extends ForgeExtension {
  name = 'ForgeSocial';
  description = 'An extension that integrates Reddit, YouTube, and GitHub.';
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  version = require('../package.json').version;

  /* ------------------------------- Properties ------------------------------ */

  public client!: ForgeClient;
  public youtube?: Innertube;
  public github?: Octokit;
  public commands!: ForgeSocialCommandManager;

  private emitter = new TypedEmitter<TransformEvents<IForgeSocialEvents>>();

  private accessToken = '';
  private tokenExpiresAt = 0;
  private tokenRefreshInterval: NodeJS.Timeout | null = null;
  private _pollingStarted = false;

  /* ----------------------------- Initialization ---------------------------- */

  constructor(private readonly options: IForgeSocialOptions) {
    super();
  }

  /**
   * Main entrypoint. Initializes integrations, events, and polling.
   */
  async init(client: ForgeClient) {
    const start = Date.now()
    this.client = client;
    this.commands = new ForgeSocialCommandManager(client);

    EventManager.load(ForgeSocialEventManagerName, __dirname + `/events`);
    if (this.options.events?.length) {
      this.client.events.load(ForgeSocialEventManagerName, this.options.events);
    }

    await Promise.all([
      this.initGitHub(),
      this.initYouTube(client),
      this.initReddit()
    ])

    await Promise.all([
      loadTrackedSubredditsFromFile(),
      loadTrackedChannelsFromFile()
    ])

    await this.refreshToken()
    this.startPolling();
    Logger.debug(`ForgeSocial: Initialized in ${Date.now() - start}ms`)
  }

  /* -------------------------------------------------------------------------- */
  /*                            Integration: GitHub                             */
  /* -------------------------------------------------------------------------- */

  private async initGitHub() {
    const { github } = this.options;
    if (!github) {
      return Logger.warn('ForgeSocial: Missing GitHub token. Skipping GitHub initialization.');
    }

    this.load(__dirname + `/functions/github`);

    try {
      this.github = new Octokit({
        auth: github.token,
        userAgent: `forge.social-extension:${this.version} (Discord bot)`,
        log: github.log
          ? {
              debug: Logger.debug,
              info: Logger.info,
              warn: Logger.warn,
              error: Logger.error,
            }
          : undefined,
      });
      const user = await this.github.rest.users.getAuthenticated();
      Logger.info(`ForgeSocial: GitHub authenticated as ${user.data.login}`);
    } catch (err) {
      Logger.error('ForgeSocial: Failed to initialize GitHub client:', err);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                           Integration: YouTube                             */
  /* -------------------------------------------------------------------------- */

  private async initYouTube(client: ForgeClient) {
    const { youtube } = this.options;
    if (!youtube?.enabled) return;

    this.youtube = await Innertube.create({
      cookie: youtube.client === ClientType.TV ? undefined : youtube.cookie,
      user_agent: youtube.userAgent,
      cache: youtube.cache ? new UniversalCache(true, './ForgeSocial/youtube-cache') : undefined,
      client_type: youtube.client,
      po_token: youtube.poToken,
    });

    if (youtube.client === ClientType.TV) {
      try {
      this.youtube.session.on('auth-pending', (data) => {
        Logger.info(
          [
            'ForgeSocial: YouTube client pending authentication',
            `  Verification URL : ${data.verification_url}`,
            `  User Code        : ${data.user_code}`,
            `  Device Code      : ${data.device_code}`,
            `  Expires In       : ${data.expires_in} seconds`,
            ` `
          ].join('\n'),
        );
        this.fireEvent('youtubeAuthPending', data);
      });

      this.youtube.session.on('auth', (data) => {
        Logger.info(
          [
            'ForgeSocial: YouTube client authenticated',
            `  Access Token     : ${redact(data.credentials.access_token, 6)}`,
            `  Refresh Token    : ${data.credentials.refresh_token}`,
            `  Expires In       : ${data.credentials.expires_in}`,
            `  Expiry Date      : ${new Date(data.credentials.expiry_date).toUTCString()}`,
            `  Client           : ${data.credentials.client}`,
            `  Type             : ${data.credentials.token_type}`,
            `  Scope            : ${data.credentials.scope}`,
          ].join('\n'),
        );
        this.fireEvent('youtubeAuth', data);
      });
      this.youtube.session.on('auth-error', (data) => {
        Logger.info(
          [
            'ForgeSocial: YouTube client authentication failed',
            `  Error Message : ${data.message}`,
            `  Error Cause   : ${data.cause}`,
            `  Error Stack   : ${data.stack}`,
            `  Error Name    : ${data.name}`,
            `  Error Info    : ${data.info}`
          ].join('\n'),
        );
        this.fireEvent('youtubeAuthError', data);
      });
        await this.youtube.session.signIn();
        if (youtube.cache) {
          try {
            await this.youtube.session.oauth.cacheCredentials();
            Logger.info('ForgeSocial: Cached YouTube credentials');
          } catch (err) {
            Logger.error('ForgeSocial: Failed to cache YouTube credentials:', err);
          }
        }
      } catch (err) {
        Logger.error('ForgeSocial: Failed to sign in YouTube TV client:', err);
      }
    }

    Log.setLevel(Log.Level[youtube.log || 'INFO']);
    client.youtube = this.youtube;

    this.load(__dirname + `/functions/youtube`);
  }

  /* -------------------------------------------------------------------------- */
  /*                           Integration: Reddit                              */
  /* -------------------------------------------------------------------------- */

  private initReddit() {
    if (this.options.reddit) {
      this.load(__dirname + `/functions/reddit`);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                             Accessors / Utils                              */
  /* -------------------------------------------------------------------------- */

  public async getAccessToken(): Promise<string | null> {
    const { reddit } = this.options;
    if (!this.validateRedditCredentials(reddit)) return null;
    return this.accessToken;
  }

  public async getUsername(): Promise<string | null> {
    const { reddit } = this.options;
    if (!this.validateRedditCredentials(reddit)) return null;
    return reddit?.redditUsername || null;
  }

  public async fireEvent(event: keyof IForgeSocialEvents, args: any) {
    return this.emitter.emit(event, args);
  }

  /* -------------------------------------------------------------------------- */
  /*                            Polling and Events                              */
  /* -------------------------------------------------------------------------- */

  public startPolling() {
    if (this._pollingStarted) return;
    this._pollingStarted = true;

    // Reddit polling
    if (this.accessToken && this.options.reddit?.redditUsername) {
      startPollingTrackedSubreddits(this.accessToken, this.options.reddit.redditUsername, (post) =>
        this.fireEvent('newRedditPost', post),
      );
    }

    // YouTube polling
    startPollingTrackedChannels(this, (video) => this.fireEvent('newYoutubeVideo', video));
  }

  /* -------------------------------------------------------------------------- */
  /*                        Reddit Token Refresh Logic                          */
  /* -------------------------------------------------------------------------- */

  private async refreshToken() {
    const { reddit } = this.options;
    if (!this.validateRedditCredentials(reddit) || !reddit) return;

    const body = new URLSearchParams({ grant_type: 'client_credentials' });
    const creds = Buffer.from(`${reddit.clientID}:${reddit.clientSecret}`).toString('base64');

    const tokenData = await new Promise<{ access_token: string; expires_in: number }>(
      (resolve, reject) => {
        const req = https.request(
          {
            method: 'POST',
            hostname: 'www.reddit.com',
            path: '/api/v1/access_token',
            headers: {
              Authorization: `Basic ${creds}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': body.toString().length,
              'User-Agent': `web:forge.social-extension:${this.version} (discord bot by /u/${reddit.redditUsername})`,
            },
          },
          (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
              try {
                resolve(JSON.parse(data));
              } catch (err) {
                reject(err);
              }
            });
          },
        );

        req.on('error', reject);
        req.write(body.toString());
        req.end();
      },
    );

    this.accessToken = tokenData.access_token;
    this.tokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
    Logger.info('ForgeSocial: Reddit access token refreshed.');

    if (this.tokenRefreshInterval) clearInterval(this.tokenRefreshInterval);

    this.tokenRefreshInterval = setInterval(() => {
      if (Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000) {
        this.refreshToken().catch(console.error);
      }
    }, 60 * 1000);
  }

  /* -------------------------------------------------------------------------- */
  /*                            Internal Validation                             */
  /* -------------------------------------------------------------------------- */

  private validateRedditCredentials(reddit?: IForgeSocialOptions['reddit']): boolean {
    const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
    const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;

    if (!allProvided && !allNull) {
      Logger.error(
        'ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided.',
      );
      return false;
    }

    if (!allProvided) {
      Logger.warn('ForgeSocial: Missing Reddit credentials.');
      return false;
    }

    return true;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export { ClientType } from 'youtubei.js';
