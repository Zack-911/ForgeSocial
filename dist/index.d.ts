import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { ForgeSocialCommandManager } from "./structures/ForgeSocialCommandManager";
import { IForgeSocialEvents } from "./structures/ForgeSocialEventHandlers";
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
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};
/**
 * ForgeSocial extension for ForgeScript. Provides Reddit integration, subreddit tracking, and event emission.
 */
export declare class ForgeSocial extends ForgeExtension {
    private readonly options;
    name: string;
    description: string;
    version: any;
    private client;
    private emitter;
    private accessToken;
    private tokenExpiresAt;
    private tokenRefreshInterval;
    commands: ForgeSocialCommandManager;
    /**
     * Constructs a new ForgeSocial extension instance.
     * @param options - Configuration options for the extension
     */
    constructor(options: IForgeSocialOptions);
    /**
     * Initializes the extension, loads events, commands, and tracked subreddits, refreshes the Reddit token, and starts polling.
     * @param client - The ForgeClient instance
     */
    init(client: ForgeClient): Promise<void>;
    /**
     * Gets the current Reddit OAuth access token.
     * @returns The access token string
     */
    getAccessToken(): Promise<string>;
    /**
     * Emits a new subreddit post event.
     * @param event - The event name
     * @param args - The event arguments (post data)
     */
    newSubredditPost(event: keyof IForgeSocialEvents, args: any): Promise<boolean>;
    /**
     * Gets the configured Reddit username.
     * @returns The Reddit username string
     */
    getUsername(): Promise<string>;
    /**
     * Starts polling for all tracked subreddits and emits new posts as events.
     * Safe to call after init. Does nothing if already polling.
     * @returns Promise<void>
     */
    startPolling(): Promise<void>;
    private _pollingStarted;
    /**
     * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
     * Logs warnings if configuration is missing.
     * @private
     */
    private refreshToken;
}
//# sourceMappingURL=index.d.ts.map