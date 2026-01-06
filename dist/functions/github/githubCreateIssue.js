"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubCreateIssue',
    description: 'Create a new issue in a GitHub repository',
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
            name: 'title',
            description: 'Issue title',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'body',
            description: 'Issue body',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'assignees',
            description: 'Comma-separated list of usernames to assign',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'labels',
            description: 'Comma-separated list of label names',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'milestone',
            description: 'Milestone ID to associate the issue with',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, title, body, assignees, labels, milestone]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const issue = await github.rest.issues.create({
                owner,
                repo,
                title,
                body: body || title,
                assignees: assignees ? assignees.split(',') : undefined,
                labels: labels ? labels.split(',') : undefined,
                milestone: milestone ? milestone : undefined,
            });
            return this.success(JSON.stringify(issue, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubCreateIssue.js.map