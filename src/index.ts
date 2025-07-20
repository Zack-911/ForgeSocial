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
import { Innertube, Log } from 'youtubei.js';

/**
 * Options for configuring the ForgeSocial extension.
 * @property {Array<keyof IForgeSocialEvents>=} events - List of event names to load for the extension.
 * @property {string=} clientID - Reddit API client ID for authentication.
 * @property {string=} clientSecret - Reddit API client secret for authentication.
 * @property {string} redditUsername - Reddit username for user-agent and API requests (required).
 */
export interface IForgeSocialOptions {
  events?: Array<keyof IForgeSocialEvents>;
  clientID?: string;
  clientSecret?: string;
  redditUsername?: string;
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
    this.youtube = await Innertube.create();
    Log.setLevel(Log.Level.NONE);
    client.youtube = this.youtube;

    EventManager.load(ForgeSocialEventManagerName, __dirname + `/events`);
    this.load(__dirname + `/functions`);
    await loadTrackedSubredditsFromFile();
    await loadTrackedChannelsFromFile(); // <-- YouTube state preload

    if (this.options.events?.length) {
      this.client.events.load(ForgeSocialEventManagerName, this.options.events);
    }

    await this.refreshToken();
    await this.startPolling();
  }

  /**
   * Gets the current Reddit OAuth access token.
   */
  public async getAccessToken(): Promise<string | null> {
    const { clientID, clientSecret, redditUsername } = this.options;
    const allProvided = !!clientID && !!clientSecret && !!redditUsername;
    const allNull = !clientID && !clientSecret && !redditUsername;
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
  public async newSubredditPost(event: keyof IForgeSocialEvents, args: any) {
    return this.emitter.emit(event, args);
  }

  /**
   * Gets the configured Reddit username.
   */
  public async getUsername(): Promise<string | null> {
    const { clientID, clientSecret, redditUsername } = this.options;
    const allProvided = !!clientID && !!clientSecret && !!redditUsername;
    const allNull = !clientID && !clientSecret && !redditUsername;
    if (!allProvided && !allNull) {
      Logger.error(
        'ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for username.',
      );
      return null;
    }
    return redditUsername || null;
  }

  /**
   * Starts polling for tracked subreddits and YouTube channels.
   */
  public async startPolling(): Promise<void> {
    if (this._pollingStarted) return;
    this._pollingStarted = true;

    // Reddit polling
    if (this.accessToken && this.options.redditUsername) {
      await startPollingTrackedSubreddits(this.accessToken, this.options.redditUsername, (post) =>
        this.newSubredditPost('newRedditPost', post),
      );
    }

    // YouTube polling
    await startPollingTrackedChannels(this, (video) =>
      this.newSubredditPost('newYoutubeVideo', video),
    );
  }

  /**
   * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
   */
  private async refreshToken() {
    const { clientID, clientSecret, redditUsername } = this.options;
    const allProvided = !!clientID && !!clientSecret && !!redditUsername;
    const allNull = !clientID && !clientSecret && !redditUsername;
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

    if (!redditUsername) {
      Logger.error(
        'ForgeSocial: Missing redditUsername. This will break most functionality as Reddit requires it in the user-agent.',
      );
      return;
    }

    const body = new URLSearchParams({ grant_type: 'client_credentials' });
    const creds = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

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
              'User-Agent': `web:forge.reddit-extension:1.0.0 (discord bot by /u/${redditUsername})`,
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
