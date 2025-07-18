"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
exports.default = new forgescript_1.NativeFunction({
    name: "$getWikiPage",
    version: "1.0.0",
    description: "Get the subreddit wiki page. ",
    args: [
        {
            name: "subreddit",
            description: "The subreddit to get the wiki pages of",
            type: forgescript_1.ArgType.String,
            rest: false,
            required: true,
        },
        {
            name: "page",
            description: "The page name to get",
            type: forgescript_1.ArgType.String,
            rest: false,
            required: false,
        }
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [subreddit, page]) {
        const ext = ctx.client.getExtension("ForgeSocial");
        const username = await ext?.getUsername();
        if (!username)
            return this.customError("No Reddit username found at index file.");
        if (page) {
            let json = await (0, redditFetch_1.redditFetch)(`r/${subreddit}/wiki/${page}.json`, username);
            return this.success(JSON.stringify(json, null, 2));
        }
        else {
            let json = await (0, redditFetch_1.redditFetch)(`r/${subreddit}/wiki/pages.json`, username);
            return this.success(JSON.stringify(json, null, 2));
        }
    }
});
//# sourceMappingURL=getWikiPage.js.map