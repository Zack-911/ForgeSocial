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
const pollYoutube_1 = require("./natives/pollYoutube");
const https_1 = __importDefault(require("https"));
const youtubei_js_1 = require("youtubei.js");
/**
 * ForgeSocial extension for ForgeScript. Provides Reddit integration, subreddit tracking, and event emission.
 */
class ForgeSocial extends forgescript_1.ForgeExtension {
    options;
    name = 'ForgeSocial';
    description = 'An extension that lets you interact with reddit.';
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    version = require('../package.json').version;
    client;
    youtube;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    accessToken = '';
    tokenExpiresAt = 0;
    tokenRefreshInterval = null;
    commands;
    _pollingStarted = false;
    /**
     * Constructs a new ForgeSocial extension instance.
     * @param options - Configuration options for the extension
     */
    constructor(options) {
        super();
        this.options = options;
    }
    /**
     * Initializes the extension, loads events, commands, and tracked subreddits/channels,
     * refreshes the Reddit token, and starts polling.
     * @param client - The ForgeClient instance
     */
    async init(client) {
        this.client = client;
        this.commands = new ForgeSocialCommandManager_1.ForgeSocialCommandManager(client);
        this.youtube = await youtubei_js_1.Innertube.create();
        youtubei_js_1.Log.setLevel(youtubei_js_1.Log.Level.NONE);
        client.youtube = this.youtube;
        forgescript_1.EventManager.load(constants_1.ForgeSocialEventManagerName, __dirname + `/events`);
        this.load(__dirname + `/functions`);
        await (0, pollSubreddit_1.loadTrackedSubredditsFromFile)();
        await (0, pollYoutube_1.loadTrackedChannelsFromFile)();
        if (this.options.events?.length) {
            this.client.events.load(constants_1.ForgeSocialEventManagerName, this.options.events);
        }
        await this.refreshToken();
        this.startPolling();
    }
    /**
     * Gets the current Reddit OAuth access token.
     */
    async getAccessToken() {
        const { clientID, clientSecret, redditUsername } = this.options;
        const allProvided = !!clientID && !!clientSecret && !!redditUsername;
        const allNull = !clientID && !clientSecret && !redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for access token.');
            return null;
        }
        if (!allProvided) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Reddit credentials. Returning null for access token.');
            return null;
        }
        return this.accessToken;
    }
    /**
     * Emits a new subreddit or YouTube post event.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async newPost(event, args) {
        return this.emitter.emit(event, args);
    }
    /**
     * Gets the configured Reddit username.
     */
    async getUsername() {
        const { clientID, clientSecret, redditUsername } = this.options;
        const allProvided = !!clientID && !!clientSecret && !!redditUsername;
        const allNull = !clientID && !clientSecret && !redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for username.');
            return null;
        }
        return redditUsername || null;
    }
    /**
     * Starts polling for tracked subreddits and YouTube channels.
     */
    startPolling() {
        if (this._pollingStarted)
            return;
        this._pollingStarted = true;
        // Reddit polling
        if (this.accessToken && this.options.redditUsername) {
            (0, pollSubreddit_1.startPollingTrackedSubreddits)(this.accessToken, this.options.redditUsername, (post) => this.newPost('newRedditPost', post));
        }
        // YouTube polling
        (0, pollYoutube_1.startPollingTrackedChannels)(this, (video) => this.newPost('newYoutubeVideo', video));
    }
    /**
     * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
     */
    async refreshToken() {
        const { clientID, clientSecret, redditUsername } = this.options;
        const allProvided = !!clientID && !!clientSecret && !!redditUsername;
        const allNull = !clientID && !clientSecret && !redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Skipping token refresh.');
            return;
        }
        if (!allProvided) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Reddit credentials. Skipping token refresh.');
            return;
        }
        if (!redditUsername) {
            forgescript_1.Logger.error('ForgeSocial: Missing redditUsername. This will break most functionality as Reddit requires it in the user-agent.');
            return;
        }
        const body = new URLSearchParams({ grant_type: 'client_credentials' });
        const creds = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
        const tokenData = await new Promise((resolve, reject) => {
            const req = https_1.default.request({
                method: 'POST',
                hostname: 'www.reddit.com',
                path: '/api/v1/access_token',
                headers: {
                    Authorization: `Basic ${creds}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': body.toString().length,
                    'User-Agent': `web:forge.reddit-extension:1.0.0 (discord bot by /u/${redditUsername})`,
                },
            }, (res) => {
                let data = '';
                res.on('data', (chunk) => (data += chunk));
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
            req.on('error', reject);
            req.write(body.toString());
            req.end();
        });
        this.accessToken = tokenData.access_token;
        this.tokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
        forgescript_1.Logger.info('ForgeSocial: Access token refreshed:\n' + this.accessToken);
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