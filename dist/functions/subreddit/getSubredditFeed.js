"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
var filterType;
(function (filterType) {
    filterType[filterType["best"] = 0] = "best";
    filterType[filterType["popular"] = 1] = "popular";
    filterType[filterType["new"] = 2] = "new";
    filterType[filterType["hot"] = 3] = "hot";
    filterType[filterType["top"] = 4] = "top";
    filterType[filterType["rising"] = 5] = "rising";
})(filterType || (filterType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$getSubredditFeed",
    version: "1.0.0",
    description: "Get the readable subreddit feed (title, author, upvotes, etc)",
    args: [
        {
            name: "subreddit",
            description: "The subreddit to get the feed of",
            type: forgescript_1.ArgType.String,
            rest: false,
            required: true,
        },
        {
            name: "filter",
            description: "Filter the posts by what you want bbg",
            type: forgescript_1.ArgType.Enum,
            enum: filterType,
            rest: false,
            required: false,
        },
        {
            name: "limit",
            description: "Maximum number of posts to return (max 25)",
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [subreddit, filter, limit]) {
        const ext = ctx.client.getExtension("ForgeSocial");
        const username = await ext?.getUsername();
        if (!username)
            return this.customError("No Reddit username found.");
        const token = await ext?.getAccessToken();
        if (!token)
            return this.customError("No Reddit access token found.");
        limit = typeof limit === "number" ? Math.max(1, Math.min(limit, 25)) : 5;
        const json = await (0, redditFetch_1.redditFetch)(`r/${subreddit}/${filter ?? ""}.json`, token, username);
        const posts = json.data.children.slice(0, limit).map((item) => {
            const post = item.data;
            let images = [];
            if (post.media_metadata) {
                images = Object.values(post.media_metadata)
                    .map((entry) => entry?.s?.u)
                    .filter((u) => typeof u === "string")
                    .map((u) => u.replace(/&amp;/g, "&"));
            }
            return {
                title: post.title,
                author: post.author,
                subreddit: post.subreddit_name_prefixed,
                score: post.score,
                comments: post.num_comments,
                flair: post.link_flair_text,
                nsfw: post.over_18,
                createdAt: new Date(post.created_utc * 1000).toISOString(),
                url: `https://reddit.com${post.permalink}`,
                thumbnail: post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : null,
                isVideo: post.is_video,
                media: post.media,
                images
            };
        });
        return this.success(JSON.stringify(posts, null, 2));
    }
});
//# sourceMappingURL=getSubredditFeed.js.map