"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListTeams',
    description: 'List GitHub teams',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'org',
            description: 'The organization to list teams for',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'perPage',
            description: 'The number of results per page',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'page',
            description: 'The page number',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [org, perPage, page]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const github = ext.github;
            if (!github) {
                return this.customError('GitHub client not initialized');
            }
            const response = await github.teams.list({
                org,
                per_page: perPage || undefined,
                page: page || undefined,
            });
            return this.success(JSON.stringify(response, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubListTeams.js.map