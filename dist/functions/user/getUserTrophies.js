"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserTrophies",
    version: "1.0.0",
    description: "Get the users trophies",
    args: [
        {
            name: "username",
            description: "The username to get the trophies of (without u/)",
            type: forgescript_1.ArgType.String,
            rest: true,
            required: true,
        }
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [user]) {
        const ext = ctx.client.getExtension("ForgeSocial");
        const username = await ext?.getUsername();
        if (!username)
            return this.customError("No Reddit username found at index file.");
        let json = await (0, redditFetch_1.redditFetch)(`user/${user}/trophies.json`, username);
        return this.success(JSON.stringify(json, null, 2));
    }
});
//# sourceMappingURL=getUserTrophies.js.map