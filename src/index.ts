import { EventManager, ForgeClient, ForgeExtension, Logger } from '@tryforge/forgescript';
import { ForgeSocialEventManagerName } from './constants';
import { ForgeSocialCommandManager } from './structures/ForgeSocialCommandManager';
import { IForgeSocialEvents } from './structures/ForgeSocialEventHandlers';
import { TypedEmitter } from 'tiny-typed-emitter';
import {
  loadTrackedSubredditsFromFile,
  startPollingTrackedSubreddits,
} from './natives/pollSubreddit';
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
  clientID: string;
  clientSecret: string;
  redditUsername: string;
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

  /**
   * Constructs a new ForgeSocial extension instance.
   * @param options - Configuration options for the extension
   */
  public constructor(private readonly options: IForgeSocialOptions) {
    super();
  }

  /**
   * Initializes the extension, loads events, commands, and tracked subreddits, refreshes the Reddit token, and starts polling.
   * @param client - The ForgeClient instance
   */
  async init(client: ForgeClient) {
    this.client = client;
    this.commands = new ForgeSocialCommandManager(client);
    this.youtube = await Innertube.create();
    Log.setLevel(Log.Level.DEBUG);
    client.youtube = this.youtube;

    EventManager.load(ForgeSocialEventManagerName, __dirname + `/events`);
    this.load(__dirname + `/functions`);
    loadTrackedSubredditsFromFile();

    if (this.options.events?.length)
      this.client.events.load(ForgeSocialEventManagerName, this.options.events);
    await this.refreshToken();
    await this.startPolling();
  }
  /**
   * Gets the current Reddit OAuth access token.
   * @returns The access token string
   */
  public async getAccessToken(): Promise<string> {
    return this.accessToken;
  }

  /**
   * Emits a new subreddit post event.
   * @param event - The event name
   * @param args - The event arguments (post data)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async newSubredditPost(event: keyof IForgeSocialEvents, args: any) {
    return this.emitter.emit(event, args);
  }

  /**
   * Gets the configured Reddit username.
   * @returns The Reddit username string
   */
  public async getUsername(): Promise<string> {
    return this.options.redditUsername;
  }

  /**
   * Starts polling for all tracked subreddits and emits new posts as events.
   * Safe to call after init. Does nothing if already polling.
   * @returns Promise<void>
   */
  public async startPolling(): Promise<void> {
    if (this._pollingStarted) return;
    this._pollingStarted = true;
    await startPollingTrackedSubreddits(this.accessToken, this.options.redditUsername, (post) =>
      this.newSubredditPost('newRedditPost', post),
    );
    console.log('Started Polling');
  }

  private _pollingStarted = false;

  /**
   * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
   * Logs warnings if configuration is missing.
   * @private
   */
  private async refreshToken() {
    const { clientID, clientSecret, redditUsername } = this.options;

    if (!clientID || !clientSecret) {
      Logger.warn(
        'ForgeSocial: Skipping token refresh. Client ID or Secret not provided.This may result in some functions like $getSubredditMods to not work due to reddit requiring authentication for it.',
      );
      return;
    }

    if (!redditUsername) {
      Logger.error(
        'ForgeSocial: Missing redditUsername field in index file. This will result in almost all functions not working. This is required so it can be sent to reddit via user-agent because reddit requires it.',
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
              'User-Agent': `web:forge.reddit-extension:1.0.0 (discord bot by /u/${this.options.redditUsername})`,
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
    Logger.info('ForgeSocial: Access token refreshed.:\n' + this.accessToken);

    if (this.tokenRefreshInterval) clearInterval(this.tokenRefreshInterval);

    this.tokenRefreshInterval = setInterval(() => {
      if (Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000) {
        this.refreshToken().catch(console.error);
      }
    }, 60 * 1000);
  }
}
