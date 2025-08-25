"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubUpdateRelease',
    description: 'Updates an existing GitHub release',
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
            name: 'releaseId',
            description: 'The ID of the release to update',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'tagName',
            description: 'The new tag name',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'name',
            description: 'The new release name',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'body',
            description: 'The new release description',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'draft',
            description: 'Whether the release is a draft',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'prerelease',
            description: 'Whether the release is a prerelease',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, releaseId, tagName, name, body, draft, prerelease]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const release = await github.rest.repos.updateRelease({
                owner,
                repo,
                release_id: releaseId,
                tag_name: tagName || undefined,
                name: name || undefined,
                body: body || undefined,
                draft: draft || undefined,
                prerelease: prerelease || undefined,
            });
            return this.success(JSON.stringify(release.data, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubUpdateRelease.js.map