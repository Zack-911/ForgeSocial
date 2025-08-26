"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListFollowers',
    description: 'Get the followers of the user',
    brackets: false,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    args: [
        {
            name: 'username',
            description: 'The username of the user',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    async execute(ctx, [username]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const github = ext.github;
            if (!github) {
                return this.customError('GitHub client not initialized');
            }
            if (username) {
                const response = await github.users.listFollowersForUser({
                    username,
                });
                return this.success(JSON.stringify(response, undefined, 2));
            }
            else {
                const response = await github.users.listFollowersForAuthenticatedUser();
                return this.success(JSON.stringify(response, undefined, 2));
            }
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubListFollowers.js.map