"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$getWiki',
    version: '1.0.0',
    description: 'Get the subreddit wiki index page of the name you gave',
    args: [
        {
            name: 'subreddit',
            description: 'The subreddit to get the wiki index page of',
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
            return this.customError('No Reddit username found.');
        const token = await ext?.getRedditAccessToken();
        if (!token)
            return this.customError('No Reddit access token found.');
        let json = await (0, redditFetch_1.redditFetch)(`r/${subreddit}/wiki/index.json`, token, username);
        return this.success(JSON.stringify(json, null, 2));
    },
});
//# sourceMappingURL=getWiki.js.map