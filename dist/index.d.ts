import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { ForgeSocialCommandManager } from "./structures/ForgeSocialCommandManager";
import { IForgeSocialEvents } from "./structures/ForgeSocialEventHandlers";
export interface IForgeSocialOptions {
    events?: Array<keyof IForgeSocialEvents>;
    clientID?: string;
    clientSecret?: string;
    redditUsername: string;
}
export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};
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
    constructor(options: IForgeSocialOptions);
    init(client: ForgeClient): Promise<void>;
    getAccessToken(): Promise<string>;
    getUsername(): Promise<string>;
    private refreshToken;
}
//# sourceMappingURL=index.d.ts.map