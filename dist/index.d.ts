import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { ForgeSocialCommandManager } from './structures/ForgeSocialCommandManager';
import { IForgeSocialEvents } from './structures/ForgeSocialEventHandlers';
import { Innertube, ClientType } from 'youtubei.js';
import { Octokit } from '@octokit/rest';
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
/**
 * ForgeSocial extension for ForgeScript.
 * Provides Reddit, GitHub, and YouTube integrations.
 */
export declare class ForgeSocial extends ForgeExtension {
    private readonly options;
    name: string;
    description: string;
    version: any;
    client: ForgeClient;
    youtube?: Innertube;
    github?: Octokit;
    commands: ForgeSocialCommandManager;
    private emitter;
    private accessToken;
    private tokenExpiresAt;
    private tokenRefreshInterval;
    private _pollingStarted;
    constructor(options: IForgeSocialOptions);
    /**
     * Main entrypoint. Initializes integrations, events, and polling.
     */
    init(client: ForgeClient): Promise<void>;
    private initGitHub;
    private initYouTube;
    private initReddit;
    getAccessToken(): Promise<string | null>;
    getUsername(): Promise<string | null>;
    fireEvent(event: keyof IForgeSocialEvents, args: any): Promise<boolean>;
    startPolling(): void;
    private refreshToken;
    private validateRedditCredentials;
}
export { ClientType } from 'youtubei.js';
//# sourceMappingURL=index.d.ts.map