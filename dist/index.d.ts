import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { IForgeSocialEvents } from './structures/ForgeSocialEventHandlers';
import { Innertube } from 'youtubei.js';
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
    spotify?: {
        clientID: string;
        clientSecret: string;
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
export declare class ForgeSocial extends ForgeExtension {
    private readonly options;
    name: string;
    description: string;
    version: any;
    client: ForgeClient;
    youtube?: Innertube;
    github?: Octokit;
    private emitter;
    private redditAccessToken;
    private redditTokenExpiresAt;
    private redditTokenRefreshInterval;
    private spotifyAccessToken;
    private spotifyTokenExpiresAt;
    private spotifyTokenRefreshInterval;
    commands: any;
    private _pollingStarted;
    /**
     * Constructs a new ForgeSocial extension instance.
     * @param options - Configuration options for the extension
     */
    constructor(options: IForgeSocialOptions);
    /**
     * Initializes the extension, loads events, commands, and tracked subreddits/channels,
     * refreshes the Reddit token, and starts polling.
     * @param client - The ForgeClient instance
     */
    init(client: ForgeClient): Promise<void>;
    /**
     * Gets the current Reddit OAuth access token.
     */
    getRedditAccessToken(): Promise<string | null>;
    /**
     * Gets the current Spotify OAuth access token.
     */
    getSpotifyAccessToken(): Promise<string | null>;
    /**
     * Emits a new subreddit or YouTube post event.
     */
    newPost(event: keyof IForgeSocialEvents, args: any): Promise<boolean>;
    /**
     * Gets the configured Reddit username.
     */
    getUsername(): Promise<string | null>;
    /**
     * Starts polling for tracked subreddits and YouTube channels.
     */
    startPolling(): void;
    /**
     * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
     */
    private refreshRedditToken;
    /**
     * Refreshes the Spotify OAuth access token and schedules periodic refreshes.
     */
    private refreshSpotifyToken;
}
//# sourceMappingURL=index.d.ts.map