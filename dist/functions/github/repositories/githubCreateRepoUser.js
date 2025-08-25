"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubCreateRepoUser',
    description: 'Creates a new repository for the authenticated user',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Repository name',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'description',
            description: 'Repository description',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'homepage',
            description: 'Repository homepage URL',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'private',
            description: 'Whether the repository should be private',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'hasIssues',
            description: 'Enable issues for the repository',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'hasProjects',
            description: 'Enable projects for the repository',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'hasWiki',
            description: 'Enable wiki for the repository',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'autoInit',
            description: 'Initialize repository with a README',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'gitignoreTemplate',
            description: 'Git ignore template',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'licenseTemplate',
            description: 'License template',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'allowSquashMerge',
            description: 'Allow squash merging',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'allowMergeCommit',
            description: 'Allow merge commits',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
        {
            name: 'allowRebaseMerge',
            description: 'Allow rebase merging',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [name, description, homepage, isPrivate, hasIssues, hasProjects, hasWiki, autoInit, gitignoreTemplate, licenseTemplate, allowSquashMerge, allowMergeCommit, allowRebaseMerge,]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const repo = await github.rest.repos.createForAuthenticatedUser({
                name,
                description: description || undefined,
                homepage: homepage || undefined,
                private: isPrivate || undefined,
                has_issues: hasIssues || undefined,
                has_projects: hasProjects || undefined,
                has_wiki: hasWiki || undefined,
                auto_init: autoInit || undefined,
                gitignore_template: gitignoreTemplate || undefined,
                license_template: licenseTemplate || undefined,
                allow_squash_merge: allowSquashMerge || undefined,
                allow_merge_commit: allowMergeCommit || undefined,
                allow_rebase_merge: allowRebaseMerge || undefined,
            });
            return this.success(JSON.stringify(repo.data, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubCreateRepoUser.js.map