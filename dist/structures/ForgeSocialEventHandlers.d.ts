import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
export interface IForgeSocialEvents {
    error: [Error];
    newRedditPost: JSON;
    newYoutubeVideo: JSON;
    newYoutubeSubscriber: JSON;
}
export declare class ForgeSocialEventHandler<T extends keyof IForgeSocialEvents> extends BaseEventHandler<IForgeSocialEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=ForgeSocialEventHandlers.d.ts.map