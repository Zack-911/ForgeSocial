"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubUpdateFile',
    description: 'Creates or updates a file in a repository',
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
            description: 'The path where to create/update the file',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'message',
            description: 'Commit message',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'content',
            description: 'File content (will be base64 encoded)',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'sha',
            description: 'Blob SHA of the file being replaced (required for updates)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'branch',
            description: 'Branch name',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'committerName',
            description: 'Committer name',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'committerEmail',
            description: 'Committer email',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, path, message, content, sha, branch, committerName, committerEmail]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        const committer = committerName && committerEmail ? { name: committerName, email: committerEmail } : undefined;
        try {
            const result = await github.rest.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message,
                content: Buffer.from(content).toString('base64'),
                sha: sha || undefined,
                branch: branch || undefined,
                committer,
            });
            return this.success(JSON.stringify({
                commit: result.data.commit,
                content: result.data.content,
            }, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubUpdateFile.js.map