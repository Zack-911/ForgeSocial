"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubDeleteFile',
    description: 'Deletes a file from a GitHub repository',
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
            description: 'The path to the file to delete',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'message',
            description: 'The commit message',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'sha',
            description: 'The blob SHA of the file being deleted',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'branch',
            description: "The branch name (default: repository's default branch)",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'committerName',
            description: 'Name of the committer',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'committerEmail',
            description: 'Email of the committer',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, path, message, sha, branch, committerName, committerEmail]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        const committer = committerName && committerEmail ? { name: committerName, email: committerEmail } : undefined;
        try {
            const result = await github.rest.repos.deleteFile({
                owner,
                repo,
                path,
                message,
                sha,
                branch: branch || undefined,
                committer,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubDeleteFile.js.map