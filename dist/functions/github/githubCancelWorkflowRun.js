"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubCancelWorkflowRun',
    description: 'Cancels a workflow run for a GitHub repository',
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
            name: 'runId',
            description: 'The ID of the workflow run',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'force',
            description: 'Force cancel the workflow run',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, runId, force]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            if (force) {
                const result = await github.actions.forceCancelWorkflowRun({
                    owner,
                    repo,
                    run_id: runId,
                });
                return this.success(JSON.stringify(result, undefined, 2));
            }
            else {
                const result = await github.actions.cancelWorkflowRun({
                    owner,
                    repo,
                    run_id: runId,
                });
                return this.success(JSON.stringify(result, undefined, 2));
            }
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubCancelWorkflowRun.js.map