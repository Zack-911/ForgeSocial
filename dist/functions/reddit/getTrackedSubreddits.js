"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const pollSubreddit_1 = require("../../natives/pollSubreddit");
exports.default = new forgescript_1.NativeFunction({
    name: '$trackSubredditsList',
    version: '1.0.0',
    description: 'Returns all active tracked subreddits',
    unwrap: false,
    output: forgescript_1.ArgType.Json,
    async execute() {
        const rs = await (0, pollSubreddit_1.getAllTrackedSubreddits)();
        return this.success(rs);
    },
});
//# sourceMappingURL=getTrackedSubreddits.js.map