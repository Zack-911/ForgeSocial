"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubGetFileContent',
    description: 'Gets the content of a file from a repository',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'owner',
            description: 'The owner of the repository',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'repo',
            description: 'The name of the repository',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'path',
            description: 'The path to the file',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'ref',
            description: 'Git reference (branch, commit, or tag)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [owner, repo, path, ref]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const content = await github.rest.repos.getContent({
                owner,
                repo,
                path,
                ref: ref || undefined,
            });
            return this.success(JSON.stringify(content, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubGetFileContent.js.map