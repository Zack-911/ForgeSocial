"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
var filterType;
(function (filterType) {
    filterType[filterType["popular"] = 0] = "popular";
    filterType[filterType["new"] = 1] = "new";
})(filterType || (filterType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$getRandomSubreddit",
    version: "1.0.0",
    description: "Get Random Subreddits info",
    args: [
        {
            name: "filter",
            description: "Filter subreddit list by 'popular' or 'new'",
            type: forgescript_1.ArgType.Enum,
            rest: false,
            required: false,
            enum: filterType
        },
        {
            name: "limit",
            description: "Maximum number of subreddits to return (max 25)",
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
            default: 5
        }
    ],
    brackets: false,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [filter, limit]) {
        const ext = ctx.client.getExtension("ForgeSocial");
        const username = await ext?.getUsername();
        if (!username)
            return this.customError("No Reddit username found.");
        const token = await ext?.getAccessToken();
        if (!token)
            return this.customError("No Reddit access token found.");
        limit = typeof limit === "number" ? Math.max(1, Math.min(limit, 25)) : 5;
        const json = await (0, redditFetch_1.redditFetch)(`subreddits/${filter ?? ""}.json`, token, username);
        const subreddits = json.data.children.slice(0, limit).map((item) => {
            return {
                name: item.data.display_name_prefixed,
                title: item.data.title,
                description: item.data.public_description,
                nsfw: item.data.over18,
                subscribers: item.data.subscribers,
                createdAt: new Date(item.data.created_utc * 1000).toISOString(),
                icon: item.data.icon_img || item.data.community_icon || null,
                banner: item.data.banner_background_image || item.data.banner_img || null,
                type: item.data.subreddit_type,
                lang: item.data.lang,
                url: `https://reddit.com${item.data.url}`
            };
        });
        return this.success(JSON.stringify(subreddits, null, 2));
    }
});
//# sourceMappingURL=getRandomSubreddit.js.map