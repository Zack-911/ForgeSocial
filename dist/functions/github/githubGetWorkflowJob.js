"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubGetWorkflowJob',
    description: 'Gets a specific job from a workflow run',
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
            name: 'jobId',
            description: 'The ID of the job',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, jobId]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const result = await github.actions.getJobForWorkflowRun({
                owner,
                repo,
                job_id: jobId,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubGetWorkflowJob.js.map