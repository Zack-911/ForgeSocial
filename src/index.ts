import { EventManager, ForgeClient, ForgeExtension, Logger } from '@tryforge/forgescript';
import { ForgeSocialEventManagerName } from './constants';
import { ForgeSocialCommandManager } from './structures/ForgeSocialCommandManager';
import { IForgeSocialEvents } from './structures/ForgeSocialEventHandlers';
import { TypedEmitter } from 'tiny-typed-emitter';
import {
  loadTrackedSubredditsFromFile,
  startPollingTrackedSubreddits,
} from './natives/pollSubreddit';
import { loadTrackedChannelsFromFile, startPollingTrackedChannels } from './natives/pollYoutube';
import https from 'https';
import { Innertube, Log, UniversalCache } from 'youtubei.js';
import { Octokit } from '@octokit/rest';
/**
 * Options for configuring the ForgeSocial extension.
 * @property {Array<keyof IForgeSocialEvents>=} events - List of event names to load for the extension.
 * @property {string=} clientID - Reddit API client ID for authentication.
 * @property {string=} clientSecret - Reddit API client secret for authentication.
 * @property {string} redditUsername - Reddit username for user-agent and API requests (required).
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
    cookie: string;
    userAgent: string;
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

/**
 * ForgeSocial extension for ForgeScript. Provides Reddit integration, subreddit tracking, and event emission.
 */
export class ForgeSocial extends ForgeExtension {
  name = 'ForgeSocial';
  description = 'An extension that lets you interact with reddit.';
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  version = require('../package.json').version;

  public client!: ForgeClient;
  public youtube?: Innertube;
  public github?: Octokit;
  private emitter = new TypedEmitter<TransformEvents<IForgeSocialEvents>>();

  private accessToken: string = '';
  private tokenExpiresAt: number = 0;
  private tokenRefreshInterval: NodeJS.Timeout | null = null;

  public commands!: ForgeSocialCommandManager;

  private _pollingStarted = false;

  /**
   * Constructs a new ForgeSocial extension instance.
   * @param options - Configuration options for the extension
   */
  public constructor(private readonly options: IForgeSocialOptions) {
    super();
  }

  /**
   * Initializes the extension, loads events, commands, and tracked subreddits/channels,
   * refreshes the Reddit token, and starts polling.
   * @param client - The ForgeClient instance
   */
  async init(client: ForgeClient) {
    this.client = client;
    this.commands = new ForgeSocialCommandManager(client);
    if (this.options.github) {
      this.load(__dirname + `/functions/github`);
      const shouldLog = this.options.github?.log ?? true;
      try {
        this.github = new Octokit({
          auth: this.options.github.token,
          userAgent: `forge.social-extension:${this.version} (Discord bot)`,
          log: shouldLog
            ? {
                debug: (msg) => Logger.debug(msg),
                info: (msg) => Logger.info(msg),
                warn: (msg) => Logger.warn(msg),
                error: (msg) => Logger.error(msg),
              }
            : {
                debug: () => {},
                info: () => {},
                warn: () => {},
                error: () => {},
              },
        });
        const user = await this.github.rest.users.getAuthenticated();
        Logger.info(
          `ForgeSocial: GitHub client initialized successfully Authenticated as ${user.data.login}`,
        );
      } catch (err) {
        Logger.error('ForgeSocial: Failed to initialize GitHub client:', err);
      }
    } else {
      Logger.warn('ForgeSocial: Missing GitHub token. Skipping GitHub initialization.');
    }
    const shouldCache = this.options.youtube?.cache ?? true;
    if (this.options.youtube?.enabled) {
      this.youtube = await Innertube.create({
        cookie: this.options.youtube?.cookie || undefined,
        user_agent: this.options.youtube?.userAgent || undefined,
        cache: shouldCache ? new UniversalCache(true, './ForgeSocial/youtube-cache') : undefined,
      });
      Log.setLevel(Log.Level[this.options.youtube?.log || 'INFO']);
      client.youtube = this.youtube;
      this.load(__dirname + `/functions/youtube`);
    }
    if (this.options.reddit) {
      this.load(__dirname + `/functions/reddit`);
    }

    EventManager.load(ForgeSocialEventManagerName, __dirname + `/events`);

    await loadTrackedSubredditsFromFile();
    await loadTrackedChannelsFromFile();

    if (this.options.events?.length) {
      this.client.events.load(ForgeSocialEventManagerName, this.options.events);
    }
    await this.refreshToken();
    this.startPolling();
  }

  /**
   * Gets the current Reddit OAuth access token.
   */
  public async getAccessToken(): Promise<string | null> {
    const { reddit } = this.options;
    const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
    const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
    if (!allProvided && !allNull) {
      Logger.error(
        'ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for access token.',
      );
      return null;
    }
    if (!allProvided) {
      Logger.warn('ForgeSocial: Missing Reddit credentials. Returning null for access token.');
      return null;
    }
    return this.accessToken;
  }

  /**
   * Emits a new subreddit or YouTube post event.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async newPost(event: keyof IForgeSocialEvents, args: any) {
    return this.emitter.emit(event, args);
  }

  /**
   * Gets the configured Reddit username.
   */
  public async getUsername(): Promise<string | null> {
    const { reddit } = this.options;
    const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
    const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
    if (!allProvided && !allNull) {
      Logger.error(
        'ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for username.',
      );
      return null;
    }
    return reddit?.redditUsername || null;
  }

  /**
   * Starts polling for tracked subreddits and YouTube channels.
   */
  public startPolling() {
    if (this._pollingStarted) return;
    this._pollingStarted = true;

    // Reddit polling
    if (this.accessToken && this.options.reddit?.redditUsername) {
      startPollingTrackedSubreddits(this.accessToken, this.options.reddit?.redditUsername, (post) =>
        this.newPost('newRedditPost', post),
      );
    }

    // YouTube polling
    startPollingTrackedChannels(this, (video) => this.newPost('newYoutubeVideo', video));
  }

  /**
   * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
   */
  private async refreshToken() {
    const { reddit } = this.options;
    const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
    const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
    if (!allProvided && !allNull) {
      Logger.error(
        'ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Skipping token refresh.',
      );
      return;
    }
    if (!allProvided) {
      Logger.warn('ForgeSocial: Missing Reddit credentials. Skipping token refresh.');
      return;
    }

    if (!reddit?.redditUsername) {
      Logger.error(
        'ForgeSocial: Missing redditUsername. This will break most functionality as Reddit requires it in the user-agent.',
      );
      return;
    }

    const body = new URLSearchParams({ grant_type: 'client_credentials' });
    const creds = Buffer.from(`${reddit?.clientID}:${reddit?.clientSecret}`).toString('base64');

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
              'User-Agent': `web:forge.social-extension:${this.version} (discord bot by /u/${reddit?.redditUsername})`,
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
    Logger.info('ForgeSocial: Access token refreshed:\n' + this.accessToken);

    if (this.tokenRefreshInterval) clearInterval(this.tokenRefreshInterval);

    this.tokenRefreshInterval = setInterval(() => {
      if (Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000) {
        this.refreshToken().catch(console.error);
      }
    }, 60 * 1000);
  }
}
