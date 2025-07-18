"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeSocial = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("./constants");
const ForgeSocialCommandManager_1 = require("./structures/ForgeSocialCommandManager");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const https_1 = __importDefault(require("https"));
class ForgeSocial extends forgescript_1.ForgeExtension {
    options;
    name = "ForgeSocial";
    description = "An extension that lets you interact with reddit.";
    version = require("../package.json").version;
    client;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    accessToken = "";
    tokenExpiresAt = 0;
    tokenRefreshInterval = null;
    commands;
    constructor(options) {
        super();
        this.options = options;
    }
    async init(client) {
        this.client = client;
        this.commands = new ForgeSocialCommandManager_1.ForgeSocialCommandManager(client);
        forgescript_1.EventManager.load(constants_1.ForgeSocialEventManagerName, __dirname + `/events`);
        this.load(__dirname + `/functions`);
        if (this.options.events?.length)
            this.client.events.load(constants_1.ForgeSocialEventManagerName, this.options.events);
        await this.refreshToken();
    }
    async getAccessToken() {
        return this.accessToken;
    }
    async getUsername() {
        return this.options.redditUsername;
    }
    async refreshToken() {
        const { clientID, clientSecret, redditUsername } = this.options;
        if (!clientID || !clientSecret) {
            forgescript_1.Logger.warn("ForgeSocial: Skipping token refresh. Client ID or Secret not provided.This may result in some functions like $getSubredditMods to not work due to reddit requiring authentication for it.");
            return;
        }
        if (!redditUsername) {
            forgescript_1.Logger.error("ForgeSocial: Missing redditUsername field in index file. This will result in almost all functions not working. This is required so it can be sent to reddit via user-agent because reddit requires it.");
            return;
        }
        const body = new URLSearchParams({ grant_type: "client_credentials" });
        const creds = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
        const tokenData = await new Promise((resolve, reject) => {
            const req = https_1.default.request({
                method: "POST",
                hostname: "www.reddit.com",
                path: "/api/v1/access_token",
                headers: {
                    Authorization: `Basic ${creds}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": body.toString().length,
                    "User-Agent": `web:forge.reddit-extension:1.0.0 (discord bot by /u/${this.options.redditUsername})`
                }
            }, res => {
                let data = "";
                res.on("data", chunk => (data += chunk));
                res.on("end", () => {
                    try {
                        resolve(JSON.parse(data));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
            req.on("error", reject);
            req.write(body.toString());
            req.end();
        });
        this.accessToken = tokenData.access_token;
        this.tokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
        forgescript_1.Logger.info("ForgeSocial: Access token refreshed.:\n" + this.accessToken);
        if (this.tokenRefreshInterval)
            clearInterval(this.tokenRefreshInterval);
        this.tokenRefreshInterval = setInterval(() => {
            if (Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000) {
                this.refreshToken().catch(console.error);
            }
        }, 60 * 1000);
    }
}
exports.ForgeSocial = ForgeSocial;
//# sourceMappingURL=index.js.map