"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
var IssueState;
(function (IssueState) {
    IssueState["Open"] = "open";
    IssueState["Closed"] = "closed";
    IssueState["All"] = "all";
})(IssueState || (IssueState = {}));
var IssueFilter;
(function (IssueFilter) {
    IssueFilter["Assigned"] = "assigned";
    IssueFilter["Created"] = "created";
    IssueFilter["Mentioned"] = "mentioned";
    IssueFilter["Subscribed"] = "subscribed";
    IssueFilter["All"] = "all";
})(IssueFilter || (IssueFilter = {}));
var IssueSort;
(function (IssueSort) {
    IssueSort["Created"] = "created";
    IssueSort["Updated"] = "updated";
    IssueSort["Comments"] = "comments";
})(IssueSort || (IssueSort = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["Asc"] = "asc";
    SortDirection["Desc"] = "desc";
})(SortDirection || (SortDirection = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListMyIssues',
    description: 'Lists issues assigned to the authenticated user across all repositories',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'filter',
            description: 'Filter to determine which issues are returned (assigned, created, mentioned, subscribed, all)',
            type: forgescript_1.ArgType.Enum,
            enum: IssueFilter,
            required: false,
            rest: false,
        },
        {
            name: 'state',
            description: 'State of the issues to return (open, closed, all)',
            type: forgescript_1.ArgType.Enum,
            enum: IssueState,
            required: false,
            rest: false,
        },
        {
            name: 'labels',
            description: 'Comma-separated list of label names to filter by',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'sort',
            description: 'How to sort the results (created, updated, comments)',
            type: forgescript_1.ArgType.Enum,
            enum: IssueSort,
            required: false,
            rest: false,
        },
        {
            name: 'direction',
            description: 'Sort direction (asc, desc)',
            type: forgescript_1.ArgType.Enum,
            enum: SortDirection,
            required: false,
            rest: false,
        },
        {
            name: 'since',
            description: 'Only show notifications updated after the given time (ISO 8601 format)',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'per_page',
            description: 'Results per page (max 100)',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'page',
            description: 'Page number of the results to fetch',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [filter, state, labels, sort, direction, since, per_page, page]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const result = await github.rest.issues.listForAuthenticatedUser({
                filter: filter || IssueFilter.Assigned,
                state: state || IssueState.Open,
                labels: labels || undefined,
                sort: sort || IssueSort.Created,
                direction: direction || SortDirection.Desc,
                since: since || undefined,
                per_page: per_page || 30,
                page: page || 1,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubListMyIssues.js.map