"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const redditFetch_1 = require("../../utils/redditFetch");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUser",
    version: "1.0.0",
    description: "Get the users info about page of the name you gave",
    args: [
        {
            name: "username",
            description: "The username to get the info of (without u/)",
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
            return this.customError("No Reddit username found.");
        const token = await ext?.getAccessToken();
        if (!token)
            return this.customError("No Reddit access token found.");
        let json = await (0, redditFetch_1.redditFetch)(`user/${user}/about.json`, token, username);
        return this.success(JSON.stringify(json, null, 2));
    }
});
//# sourceMappingURL=getUser.js.map