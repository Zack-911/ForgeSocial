import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
import { ForgeSocial } from '..';

export interface IForgeSocialEvents {
  error: [Error];
  newRedditPost: JSON;
  newYoutubeVideo: JSON;
  newYoutubeSubscriber: JSON;
}

export class ForgeSocialEventHandler<T extends keyof IForgeSocialEvents> extends BaseEventHandler<
  IForgeSocialEvents,
  T
> {
  register(client: ForgeClient): void {
    // @ts-expect-error: No idea why eslint just said to use this
    client.getExtension(ForgeSocial, true)['emitter'].on(this.name, this.listener.bind(client));
  }
}
