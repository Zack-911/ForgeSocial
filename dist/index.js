"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientType = exports.ForgeSocial = void 0;
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
const redact_1 = require("./utils/redact");
/* -------------------------------------------------------------------------- */
/*                              ForgeSocial Class                             */
/* -------------------------------------------------------------------------- */
/**
 * ForgeSocial extension for ForgeScript.
 * Provides Reddit, GitHub, and YouTube integrations.
 */
class ForgeSocial extends forgescript_1.ForgeExtension {
    options;
    name = 'ForgeSocial';
    description = 'An extension that integrates Reddit, YouTube, and GitHub.';
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    version = require('../package.json').version;
    /* ------------------------------- Properties ------------------------------ */
    client;
    youtube;
    github;
    commands;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    accessToken = '';
    tokenExpiresAt = 0;
    tokenRefreshInterval = null;
    _pollingStarted = false;
    /* ----------------------------- Initialization ---------------------------- */
    constructor(options) {
        super();
        this.options = options;
    }
    /**
     * Main entrypoint. Initializes integrations, events, and polling.
     */
    async init(client) {
        const start = Date.now();
        this.client = client;
        this.commands = new ForgeSocialCommandManager_1.ForgeSocialCommandManager(client);
        forgescript_1.EventManager.load(constants_1.ForgeSocialEventManagerName, __dirname + `/events`);
        if (this.options.events?.length) {
            this.client.events.load(constants_1.ForgeSocialEventManagerName, this.options.events);
        }
        await Promise.all([
            this.initGitHub(),
            this.initYouTube(client),
            this.initReddit()
        ]);
        await Promise.all([
            (0, pollSubreddit_1.loadTrackedSubredditsFromFile)(),
            (0, pollYoutube_1.loadTrackedChannelsFromFile)()
        ]);
        await this.refreshToken();
        this.startPolling();
        forgescript_1.Logger.debug(`ForgeSocial: Initialized in ${Date.now() - start}ms`);
    }
    /* -------------------------------------------------------------------------- */
    /*                            Integration: GitHub                             */
    /* -------------------------------------------------------------------------- */
    async initGitHub() {
        const { github } = this.options;
        if (!github) {
            return forgescript_1.Logger.warn('ForgeSocial: Missing GitHub token. Skipping GitHub initialization.');
        }
        this.load(__dirname + `/functions/github`);
        try {
            this.github = new rest_1.Octokit({
                auth: github.token,
                userAgent: `forge.social-extension:${this.version} (Discord bot)`,
                log: github.log
                    ? {
                        debug: forgescript_1.Logger.debug,
                        info: forgescript_1.Logger.info,
                        warn: forgescript_1.Logger.warn,
                        error: forgescript_1.Logger.error,
                    }
                    : undefined,
            });
            const user = await this.github.rest.users.getAuthenticated();
            forgescript_1.Logger.info(`ForgeSocial: GitHub authenticated as ${user.data.login}`);
        }
        catch (err) {
            forgescript_1.Logger.error('ForgeSocial: Failed to initialize GitHub client:', err);
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                           Integration: YouTube                             */
    /* -------------------------------------------------------------------------- */
    async initYouTube(client) {
        const { youtube } = this.options;
        if (!youtube?.enabled)
            return;
        this.youtube = await youtubei_js_1.Innertube.create({
            cookie: youtube.client === youtubei_js_1.ClientType.TV ? undefined : youtube.cookie,
            user_agent: youtube.userAgent,
            cache: youtube.cache ? new youtubei_js_1.UniversalCache(true, './ForgeSocial/youtube-cache') : undefined,
            client_type: youtube.client,
            po_token: youtube.poToken,
        });
        if (youtube.client === youtubei_js_1.ClientType.TV) {
            try {
                this.youtube.session.on('auth-pending', (data) => {
                    forgescript_1.Logger.info([
                        'ForgeSocial: YouTube client pending authentication',
                        `  Verification URL : ${data.verification_url}`,
                        `  User Code        : ${data.user_code}`,
                        `  Device Code      : ${data.device_code}`,
                        `  Expires In       : ${data.expires_in} seconds`,
                        ` `
                    ].join('\n'));
                    this.fireEvent('youtubeAuthPending', data);
                });
                this.youtube.session.on('auth', (data) => {
                    forgescript_1.Logger.info([
                        'ForgeSocial: YouTube client authenticated',
                        `  Access Token     : ${(0, redact_1.redact)(data.credentials.access_token, 6)}`,
                        `  Refresh Token    : ${data.credentials.refresh_token}`,
                        `  Expires In       : ${data.credentials.expires_in}`,
                        `  Expiry Date      : ${new Date(data.credentials.expiry_date).toUTCString()}`,
                        `  Client           : ${data.credentials.client}`,
                        `  Type             : ${data.credentials.token_type}`,
                        `  Scope            : ${data.credentials.scope}`,
                    ].join('\n'));
                    this.fireEvent('youtubeAuth', data);
                });
                this.youtube.session.on('auth-error', (data) => {
                    forgescript_1.Logger.info([
                        'ForgeSocial: YouTube client authentication failed',
                        `  Error Message : ${data.message}`,
                        `  Error Cause   : ${data.cause}`,
                        `  Error Stack   : ${data.stack}`,
                        `  Error Name    : ${data.name}`,
                        `  Error Info    : ${data.info}`
                    ].join('\n'));
                    this.fireEvent('youtubeAuthError', data);
                });
                await this.youtube.session.signIn();
                if (youtube.cache) {
                    try {
                        await this.youtube.session.oauth.cacheCredentials();
                        forgescript_1.Logger.info('ForgeSocial: Cached YouTube credentials');
                    }
                    catch (err) {
                        forgescript_1.Logger.error('ForgeSocial: Failed to cache YouTube credentials:', err);
                    }
                }
            }
            catch (err) {
                forgescript_1.Logger.error('ForgeSocial: Failed to sign in YouTube TV client:', err);
            }
        }
        youtubei_js_1.Log.setLevel(youtubei_js_1.Log.Level[youtube.log || 'INFO']);
        client.youtube = this.youtube;
        this.load(__dirname + `/functions/youtube`);
    }
    /* -------------------------------------------------------------------------- */
    /*                           Integration: Reddit                              */
    /* -------------------------------------------------------------------------- */
    initReddit() {
        if (this.options.reddit) {
            this.load(__dirname + `/functions/reddit`);
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                             Accessors / Utils                              */
    /* -------------------------------------------------------------------------- */
    async getAccessToken() {
        const { reddit } = this.options;
        if (!this.validateRedditCredentials(reddit))
            return null;
        return this.accessToken;
    }
    async getUsername() {
        const { reddit } = this.options;
        if (!this.validateRedditCredentials(reddit))
            return null;
        return reddit?.redditUsername || null;
    }
    async fireEvent(event, args) {
        return this.emitter.emit(event, args);
    }
    /* -------------------------------------------------------------------------- */
    /*                            Polling and Events                              */
    /* -------------------------------------------------------------------------- */
    startPolling() {
        if (this._pollingStarted)
            return;
        this._pollingStarted = true;
        // Reddit polling
        if (this.accessToken && this.options.reddit?.redditUsername) {
            (0, pollSubreddit_1.startPollingTrackedSubreddits)(this.accessToken, this.options.reddit.redditUsername, (post) => this.fireEvent('newRedditPost', post));
        }
        // YouTube polling
        (0, pollYoutube_1.startPollingTrackedChannels)(this, (video) => this.fireEvent('newYoutubeVideo', video));
    }
    /* -------------------------------------------------------------------------- */
    /*                        Reddit Token Refresh Logic                          */
    /* -------------------------------------------------------------------------- */
    async refreshToken() {
        const { reddit } = this.options;
        if (!this.validateRedditCredentials(reddit) || !reddit)
            return;
        const body = new URLSearchParams({ grant_type: 'client_credentials' });
        const creds = Buffer.from(`${reddit.clientID}:${reddit.clientSecret}`).toString('base64');
        const tokenData = await new Promise((resolve, reject) => {
            const req = https_1.default.request({
                method: 'POST',
                hostname: 'www.reddit.com',
                path: '/api/v1/access_token',
                headers: {
                    Authorization: `Basic ${creds}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': body.toString().length,
                    'User-Agent': `web:forge.social-extension:${this.version} (discord bot by /u/${reddit.redditUsername})`,
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
        forgescript_1.Logger.info('ForgeSocial: Reddit access token refreshed.');
        if (this.tokenRefreshInterval)
            clearInterval(this.tokenRefreshInterval);
        this.tokenRefreshInterval = setInterval(() => {
            if (Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000) {
                this.refreshToken().catch(console.error);
            }
        }, 60 * 1000);
    }
    /* -------------------------------------------------------------------------- */
    /*                            Internal Validation                             */
    /* -------------------------------------------------------------------------- */
    validateRedditCredentials(reddit) {
        const allProvided = !!reddit?.clientID && !!reddit?.clientSecret && !!reddit?.redditUsername;
        const allNull = !reddit?.clientID && !reddit?.clientSecret && !reddit?.redditUsername;
        if (!allProvided && !allNull) {
            forgescript_1.Logger.error('ForgeSocial: If one of clientID, clientSecret, or redditUsername is provided, all must be provided.');
            return false;
        }
        if (!allProvided) {
            forgescript_1.Logger.warn('ForgeSocial: Missing Reddit credentials.');
            return false;
        }
        return true;
    }
}
exports.ForgeSocial = ForgeSocial;
/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */
var youtubei_js_2 = require("youtubei.js");
Object.defineProperty(exports, "ClientType", { enumerable: true, get: function () { return youtubei_js_2.ClientType; } });
//# sourceMappingURL=index.js.map