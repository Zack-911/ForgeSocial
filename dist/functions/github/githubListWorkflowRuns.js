"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
var event;
(function (event) {
    event["BRANCH_PROTECTION_RULE"] = "branch_protection_rule";
    event["CHECK_RUN"] = "check_run";
    event["CHECK_SUITE"] = "check_suite";
    event["CREATE"] = "create";
    event["DELETE"] = "delete";
    event["DEPLOYMENT"] = "deployment";
    event["DEPLOYMENT_STATUS"] = "deployment_status";
    event["DISCUSSION"] = "discussion";
    event["DISCUSSION_COMMENT"] = "discussion_comment";
    event["FORK"] = "fork";
    event["GOLLUM"] = "gollum";
    event["ISSUE_COMMENT"] = "issue_comment";
    event["ISSUES"] = "issues";
    event["LABEL"] = "label";
    event["MERGE_GROUP"] = "merge_group";
    event["MILESTONE"] = "milestone";
    event["PAGE_BUILD"] = "page_build";
    event["PUBLIC"] = "public";
    event["PULL_REQUEST"] = "pull_request";
    event["PULL_REQUEST_COMMENT"] = "pull_request_comment";
    event["PULL_REQUEST_REVIEW"] = "pull_request_review";
    event["PULL_REQUEST_REVIEW_COMMENT"] = "pull_request_review_comment";
    event["PULL_REQUEST_TARGET"] = "pull_request_target";
    event["PUSH"] = "push";
    event["REGISTRY_PACKAGE"] = "registry_package";
    event["RELEASE"] = "release";
    event["WORKFLOW_DISPATCH"] = "workflow_dispatch";
    event["WORKFLOW_RUN"] = "workflow_run";
})(event || (event = {}));
var status;
(function (status) {
    status["COMPLETED"] = "completed";
    status["ACTION_REQUIRED"] = "action_required";
    status["CANCELLED"] = "cancelled";
    status["FAILURE"] = "failure";
    status["NEUTRAL"] = "neutral";
    status["SKIPPED"] = "skipped";
    status["STALE"] = "stale";
    status["SUCCESS"] = "success";
    status["TIMED_OUT"] = "timed_out";
    status["IN_PROGRESS"] = "in_progress";
    status["QUEUED"] = "queued";
    status["REQUESTED"] = "requested";
    status["WAITING"] = "waiting";
    status["PENDING"] = "pending";
})(status || (status = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListWorkflowRuns',
    description: 'Lists workflow runs for a GitHub repository',
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
            name: 'workflowId',
            description: 'The ID of the workflow, you can also pass the workflow name such as main.yml',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'actor',
            description: 'Gets the workflow runs triggered by a specific user. Provide the username of the person who made the push that started the workflow.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'branch',
            description: 'Gets the workflow runs triggered by a specific branch. Provide the name of the branch.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'event',
            description: 'Gets the workflow runs triggered by a specific event. Provide the name of the event.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: event,
        },
        {
            name: 'status',
            description: 'Filters workflow runs by their status or result. For example, you can get runs that are in_progress or that finished success. Only GitHub Actions can use waiting, pending, or requested as a status.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: status,
        },
        {
            name: 'limit',
            description: 'The maximum number of runs to return.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'page',
            description: 'The page of runs to return.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'excludePullRequests',
            description: 'Excludes pull requests from the list of runs.',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Boolean,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, workflowId, actor, branch, event, status, limit, page, excludePullRequests]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const result = await github.actions.listWorkflowRuns({
                owner,
                repo,
                workflow_id: workflowId,
                actor: actor || undefined,
                branch: branch || undefined,
                event: event || undefined,
                status: status || undefined,
                limit: limit || undefined,
                page: page || undefined,
                exclude_pull_requests: excludePullRequests || undefined,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubListWorkflowRuns.js.map