"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const pollSubreddit_1 = require("../../../natives/pollSubreddit");
exports.default = new forgescript_1.NativeFunction({
    name: '$trackSubreddit',
    version: '1.0.0',
    description: 'Track subreddits new posts',
    args: [
        {
            name: 'subreddit',
            description: 'The subreddit to track',
            type: forgescript_1.ArgType.String,
            rest: false,
            required: true,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [subreddit]) {
        (0, pollSubreddit_1.trackNewPosts)(subreddit);
        return this.success(true);
    },
});
//# sourceMappingURL=trackSubreddit.js.map