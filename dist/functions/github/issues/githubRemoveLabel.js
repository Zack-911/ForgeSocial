"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubRemoveLabel',
    description: 'Remove a label from an issue in a GitHub repository',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'owner',
            description: 'Repository owner',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'repo',
            description: 'Repository name',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'issue_number',
            description: 'Issue number',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'name',
            description: 'Label name to remove',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, issue_number, name]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const result = await github.rest.issues.removeLabel({
                owner,
                repo,
                issue_number,
                name,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubRemoveLabel.js.map