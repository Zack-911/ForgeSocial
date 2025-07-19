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
const pollSubreddit_1 = require("./natives/pollSubreddit");
const https_1 = __importDefault(require("https"));
/**
 * ForgeSocial extension for ForgeScript. Provides Reddit integration, subreddit tracking, and event emission.
 */
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
    /**
     * Constructs a new ForgeSocial extension instance.
     * @param options - Configuration options for the extension
     */
    constructor(options) {
        super();
        this.options = options;
    }
    /**
     * Initializes the extension, loads events, commands, and tracked subreddits, refreshes the Reddit token, and starts polling.
     * @param client - The ForgeClient instance
     */
    async init(client) {
        this.client = client;
        this.commands = new ForgeSocialCommandManager_1.ForgeSocialCommandManager(client);
        forgescript_1.EventManager.load(constants_1.ForgeSocialEventManagerName, __dirname + `/events`);
        this.load(__dirname + `/functions`);
        (0, pollSubreddit_1.loadTrackedSubredditsFromFile)();
        if (this.options.events?.length)
            this.client.events.load(constants_1.ForgeSocialEventManagerName, this.options.events);
        await this.refreshToken();
        await this.startPolling();
    }
    /**
     * Gets the current Reddit OAuth access token.
     * @returns The access token string
     */
    async getAccessToken() {
        return this.accessToken;
    }
    /**
     * Emits a new subreddit post event.
     * @param event - The event name
     * @param args - The event arguments (post data)
     */
    async newSubredditPost(event, args) {
        return this.emitter.emit(event, args);
    }
    /**
     * Gets the configured Reddit username.
     * @returns The Reddit username string
     */
    async getUsername() {
        return this.options.redditUsername;
    }
    /**
     * Starts polling for all tracked subreddits and emits new posts as events.
     * Safe to call after init. Does nothing if already polling.
     * @returns Promise<void>
     */
    async startPolling() {
        if (this._pollingStarted)
            return;
        this._pollingStarted = true;
        await (0, pollSubreddit_1.startPollingTrackedSubreddits)(this.accessToken, this.options.redditUsername, (post) => this.newSubredditPost("newRedditPost", post));
        console.log("Started Polling");
    }
    _pollingStarted = false;
    /**
     * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
     * Logs warnings if configuration is missing.
     * @private
     */
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