import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { ForgeSocial } from "..";

export interface IForgeSocialEvents {
    error: [ Error ]
    newRedditPost: {
      name: string
    }
}

export class ForgeSocialEventHandler<T extends keyof IForgeSocialEvents> extends BaseEventHandler<IForgeSocialEvents, T> {
    register(client: ForgeClient): void {
        // @ts-ignore
        client.getExtension(ForgeSocial, true)["emitter"].on(this.name, this.listener.bind(client))
    }
}