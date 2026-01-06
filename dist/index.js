"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeSocial = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("./constants");
const ForgeSocialCommandManager_1 = require("./structures/ForgeSocialCommandManager");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const pollSubreddit_1 = require("./natives/pollSubreddit");
const pollYoutube_1 = require("./natives/pollYoutube");
const https_1 = __importDefault(require("https"));
const youtubei_js_1 = require("youtubei.js");
const rest_1 = require("@octokit/rest");
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
    github;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    redditAccessToken = '';
    redditTokenExpiresAt = 0;
    redditTokenRefreshInterval = null;
    spotifyAccessToken = '';
    spotifyTokenExpiresAt = 0;
    spotifyTokenRefreshInterval = null;
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
        if (this.options.github) {
            this.load(__dirname + `/functions/github`);
            const shouldLog = this.options.github?.log ?? true;
            try {
                this.github = new rest_1.Octokit({
                    auth: this.options.github.token,
                    userAgent: `forge.social-extension:${this.version} (Discord bot)`,
                    log: shouldLog
                        ? {
                            debug: (msg) => forgescript_1.Logger.debug(msg),
                            info: (msg) => forgescript_1.Logger.info(msg),
                            warn: (msg) => forgescript_1.Logger.warn(msg),
                            error: (msg) => forgescript_1.Logger.error(msg),
                        }
                        : {
                            debug: () => { },
                            info: () => { },
                            warn: () => { },
                            error: () => { },
                        },
                });
                const user = await this.github.rest.users.getAuthenticated();
                forgescript_1.Logger.info(`ForgeSocial: GitHub client initialized successfully Authenticated as ${user.data.login}`);
            }
            catch (err) {
                forgescript_1.Logger.error('ForgeSocial: Failed to initialize GitHub client:', err);
            }
        }
        else {
            forgescript_1.Logger.warn('ForgeSocial: Missing GitHub token. Skipping GitHub initialization.');
        }
        const shouldCache = this.options.youtube?.cache ?? true;
        if (this.options.youtube?.enabled) {
            this.youtube = await youtubei_js_1.Innertube.create({
                cookie: this.options.youtube?.cookie || undefined,
                user_agent: this.options.youtube?.userAgent || undefined,
                cache: shouldCache ? new youtubei_js_1.UniversalCache(true, './ForgeSocial/youtube-cache') : undefined,
            });
            youtubei_js_1.Log.setLevel(youtubei_js_1.Log.Level[this.options.youtube?.log || 'INFO']);
            client.youtube = this.youtube;
            this.load(__dirname + `/functions/youtube`);
        }
        if (this.options.reddit) {
            this.load(__dirname + `/functions/reddit`);
        }
        if (this.options.spotify) {
            this.load(__dirname + `/functions/spotify`);
        }
        forgescript_1.EventManager.load(constants_1.ForgeSocialEventManagerName, __dirname + `/events`);
        await (0, pollSubreddit_1.loadTrackedSubredditsFromFile)();
        await (0, pollYoutube_1.loadTrackedChannelsFromFile)();
        if (this.options.events?.length) {
            this.client.events.load(constants_1.ForgeSocialEventManagerName, this.options.events);
        }
        await this.refreshRedditToken();
        await this.refreshSpotifyToken();
        this.startPolling();
    }
    /**
     * Gets the current Reddit OAuth access token.
     */
    async getRedditAccessToken() {
        const { reddit } = this.options;
        const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
        const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for Reddit access token.');
            return null;
        }
        if (!allProvided) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Reddit credentials. Returning null for Reddit access token.');
            return null;
        }
        return this.redditAccessToken;
    }
    /**
     * Gets the current Spotify OAuth access token.
     */
    async getSpotifyAccessToken() {
        const { spotify } = this.options;
        const allProvided = !!spotify?.clientID && !!spotify?.clientSecret;
        if (!allProvided) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Spotify credentials. Returning null for Spotify access token.');
            return null;
        }
        return this.spotifyAccessToken;
    }
    /**
     * Emits a new subreddit or YouTube post event.
     */
    async newPost(event, args) {
        return this.emitter.emit(event, args);
    }
    /**
     * Gets the configured Reddit username.
     */
    async getUsername() {
        const { reddit } = this.options;
        const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
        const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Returning null for username.');
            return null;
        }
        return reddit?.redditUsername || null;
    }
    /**
     * Starts polling for tracked subreddits and YouTube channels.
     */
    startPolling() {
        if (this._pollingStarted)
            return;
        this._pollingStarted = true;
        // Reddit polling
        if (this.redditAccessToken && this.options.reddit?.redditUsername) {
            (0, pollSubreddit_1.startPollingTrackedSubreddits)(this.redditAccessToken, this.options.reddit?.redditUsername, (post) => this.newPost('newRedditPost', post));
        }
        // YouTube polling
        (0, pollYoutube_1.startPollingTrackedChannels)(this, (video) => this.newPost('newYoutubeVideo', video));
    }
    /**
     * Refreshes the Reddit OAuth access token and schedules periodic refreshes.
     */
    async refreshRedditToken() {
        const { reddit } = this.options;
        const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
        const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided. Skipping Reddit token refresh.');
            return;
        }
        if (!allProvided) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Reddit credentials. Skipping Reddit token refresh.');
            return;
        }
        if (!reddit?.redditUsername) {
            forgescript_1.Logger.error('ForgeSocial: Missing redditUsername. This will break most functionality as Reddit requires it in the user-agent.');
            return;
        }
        const body = new URLSearchParams({ grant_type: 'client_credentials' });
        const creds = Buffer.from(`${reddit?.clientID}:${reddit?.clientSecret}`).toString('base64');
        const tokenData = await new Promise((resolve, reject) => {
            const req = https_1.default.request({
                method: 'POST',
                hostname: 'www.reddit.com',
                path: '/api/v1/access_token',
                headers: {
                    Authorization: `Basic ${creds}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': body.toString().length,
                    'User-Agent': `web:forge.social-extension:${this.version} (discord bot by /u/${reddit?.redditUsername})`,
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
        this.redditAccessToken = tokenData.access_token;
        this.redditTokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
        forgescript_1.Logger.info('ForgeSocial: Reddit access token refreshed:\n' + this.redditAccessToken);
        if (this.redditTokenRefreshInterval)
            clearInterval(this.redditTokenRefreshInterval);
        this.redditTokenRefreshInterval = setInterval(() => {
            if (Date.now() >= this.redditTokenExpiresAt - 5 * 60 * 1000) {
                this.refreshRedditToken().catch(console.error);
            }
        }, 60 * 1000);
    }
    /**
     * Refreshes the Spotify OAuth access token and schedules periodic refreshes.
     */
    async refreshSpotifyToken() {
        const { spotify } = this.options;
        if (!spotify?.clientID || !spotify?.clientSecret) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Spotify credentials. Skipping Spotify token refresh.');
            return;
        }
        const body = new URLSearchParams({ grant_type: 'client_credentials' });
        const creds = Buffer.from(`${spotify.clientID}:${spotify.clientSecret}`).toString('base64');
        const tokenData = await new Promise((resolve, reject) => {
            const req = https_1.default.request({
                method: 'POST',
                hostname: 'accounts.spotify.com',
                path: '/api/token',
                headers: {
                    Authorization: `Basic ${creds}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': body.toString().length,
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
        this.spotifyAccessToken = tokenData.access_token;
        this.spotifyTokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
        forgescript_1.Logger.info('ForgeSocial: Spotify access token refreshed:\n' + this.spotifyAccessToken);
        if (this.spotifyTokenRefreshInterval)
            clearInterval(this.spotifyTokenRefreshInterval);
        this.spotifyTokenRefreshInterval = setInterval(() => {
            if (Date.now() >= this.spotifyTokenExpiresAt - 5 * 60 * 1000) {
                this.refreshSpotifyToken().catch(console.error);
            }
        }, 60 * 1000);
    }
}
exports.ForgeSocial = ForgeSocial;
//# sourceMappingURL=index.js.map