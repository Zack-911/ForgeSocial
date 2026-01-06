"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$getSubreddit',
    version: '1.0.0',
    description: 'Get the subreddit about page of the name you gave',
    args: [
        {
            name: 'subreddit',
            description: 'The subreddit to get the about page of',
            type: forgescript_1.ArgType.String,
            rest: true,
            required: true,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [subreddit]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const username = await ext?.getUsername();
        if (!username)
            return this.customError('No Reddit username found at index file.');
        const token = await ext?.getAccessToken();
        if (!token)
            return this.customError('No Reddit access token found.');
        let json = await (0, redditFetch_1.redditFetch)(`r/${subreddit}/about.json`, token, username);
        json = {
            name: json.data.display_name_prefixed,
            title: json.data.title,
            description: json.data.public_description,
            nsfw: json.data.over18,
            subscribers: json.data.subscribers,
            activeUsers: json.data.accounts_active,
            createdAt: new Date(json.data.created_utc * 1000).toISOString(),
            icon: json.data.icon_img || json.data.community_icon || null,
            banner: json.data.banner_background_image || json.data.banner_img || null,
            type: json.data.subreddit_type,
            lang: json.data.lang,
            url: `https://reddit.com${json.data.url}`,
        };
        return this.success(JSON.stringify(json, null, 2));
    },
});
//# sourceMappingURL=getSubreddit.js.map