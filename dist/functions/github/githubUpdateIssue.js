"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubUpdateIssue',
    description: 'Update an existing issue in a GitHub repository',
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
            name: 'title',
            description: 'New issue title',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'body',
            description: 'New issue description',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'assignee',
            description: 'GitHub username of the assignee',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'assignees',
            description: 'List of assignees (comma-separated)',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'labels',
            description: 'List of labels (comma-separated)',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'milestone',
            description: 'Milestone number',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, issue_number, title, body, assignee, assignees, labels, milestone]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const result = await github.rest.issues.update({
                owner,
                repo,
                issue_number,
                title: title || undefined,
                body: body || undefined,
                assignee: assignee || undefined,
                assignees: assignees ? assignees.split(',') : undefined,
                labels: labels ? labels.split(',') : undefined,
                milestone: milestone || undefined,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubUpdateIssue.js.map