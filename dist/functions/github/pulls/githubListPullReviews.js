"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
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
            type: forgescript_1.ArgType.String,
            required: false,
            default: 'created',
            rest: false,
        },
        {
            name: 'direction',
            description: 'Sort direction',
            type: forgescript_1.ArgType.String,
            required: false,
            default: 'desc',
            rest: false,
        },
        {
            name: 'perPage',
            description: 'Results per page (max 100)',
            type: forgescript_1.ArgType.Number,
            required: false,
            default: 30,
            rest: false,
        },
        {
            name: 'page',
            description: 'Page number of the results to fetch',
            type: forgescript_1.ArgType.Number,
            required: false,
            default: 1,
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
                sort: sort || 'created',
                direction: direction || 'desc',
                per_page: perPage || 30,
                page: page || 1,
            });
            return this.success(JSON.stringify(reviews.data, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubListPullReviews.js.map