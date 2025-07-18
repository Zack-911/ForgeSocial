import { BaseCommandManager } from "@tryforge/forgescript";
import { IForgeSocialEvents } from "./ForgeSocialEventHandlers";
import { ForgeSocialEventManagerName } from "../constants";

export class ForgeSocialCommandManager extends BaseCommandManager<keyof IForgeSocialEvents> {
    handlerName = ForgeSocialEventManagerName
}