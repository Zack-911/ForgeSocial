"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
var ReviewSort;
(function (ReviewSort) {
    ReviewSort["CREATED"] = "created";
    ReviewSort["UPDATED"] = "updated";
    ReviewSort["CREATED_AT"] = "created_at";
})(ReviewSort || (ReviewSort = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (SortDirection = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListPullReviews',
    description: 'List reviews for a pull request',
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
            name: 'pullNumber',
            description: 'The pull request number',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'sort',
            description: 'How to sort the results',
            type: forgescript_1.ArgType.Enum,
            enum: ReviewSort,
            required: false,
            rest: false,
        },
        {
            name: 'direction',
            description: 'Sort direction',
            type: forgescript_1.ArgType.Enum,
            enum: SortDirection,
            required: false,
            rest: false,
        },
        {
            name: 'perPage',
            description: 'Results per page',
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
    async execute(ctx, [owner, repo, pullNumber, sort, direction, perPage, page]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const reviews = await github.rest.pulls.listReviews({
                owner,
                repo,
                pull_number: pullNumber,
                sort: sort || ReviewSort.CREATED,
                direction: direction || SortDirection.DESC,
                per_page: perPage || undefined,
                page: page || undefined,
            });
            return this.success(JSON.stringify(reviews.data, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubListPullReviews.js.map