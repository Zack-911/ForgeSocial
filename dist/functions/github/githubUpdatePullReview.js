"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubUpdatePullReview',
    description: 'Update the body text of a review that has not been submitted',
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
            name: 'reviewId',
            description: 'The ID of the review',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'body',
            description: 'The updated body text of the review',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, pullNumber, reviewId, body]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const review = await github.rest.pulls.updateReview({
                owner,
                repo,
                pull_number: pullNumber,
                review_id: reviewId,
                body,
            });
            return this.success(JSON.stringify(review.data, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubUpdatePullReview.js.map