"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
var sort;
(function (sort) {
    sort[sort["new"] = 0] = "new";
    sort[sort["hot"] = 1] = "hot";
    sort[sort["top"] = 2] = "top";
    sort[sort["relevance"] = 3] = "relevance";
    sort[sort["comments"] = 4] = "comments";
})(sort || (sort = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$searchSubredditPosts',
    version: '1.0.0',
    description: 'Search for posts within a specific subreddit',
    args: [
        {
            name: 'subreddit',
            description: 'The subreddit to search in',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'query',
            description: 'The search query string',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'limit',
            description: 'Maximum number of results (default: 25)',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'sort',
            description: 'Sorting method (relevance, hot, new, top, comments)',
            type: forgescript_1.ArgType.Enum,
            enum: sort,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [subreddit, query, limit = 25, sort = 'relevance']) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const username = await ext?.getUsername();
        if (!username)
            return this.customError('No Reddit username found.');
        const token = await ext?.getAccessToken();
        if (!token)
            return this.customError('No Reddit access token found.');
        const encodedQuery = encodeURIComponent(query);
        const url = `r/${subreddit}/search.json?q=${encodedQuery}&type=link&limit=${limit}&sort=${sort}`;
        const json = await (0, redditFetch_1.redditFetch)(url, token, username);
        if (!json?.data?.children?.length)
            return this.customError('No posts found for this query.');
        return this.success(JSON.stringify(json.data.children.map((c) => c.data), null, 2));
    },
});
//# sourceMappingURL=searchSubreddit.js.map