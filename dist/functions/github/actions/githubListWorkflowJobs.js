"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
var filter;
(function (filter) {
    filter["latest"] = "latest";
    filter["all"] = "all";
})(filter || (filter = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListWorkflowJobs',
    description: 'Lists jobs for a workflow run',
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
            name: 'filter',
            description: 'Filter jobs by status',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: filter,
        },
        {
            name: 'perPage',
            description: 'Results per page (max 100)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'page',
            description: 'Page number of the results to fetch',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, runId, filter, perPage, page]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const result = await github.actions.listJobsForWorkflowRun({
                owner,
                repo,
                run_id: runId,
                filter: filter || undefined,
                per_page: perPage || undefined,
                page: page || undefined,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubListWorkflowJobs.js.map