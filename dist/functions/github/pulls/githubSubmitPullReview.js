"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubSubmitPullReview',
    description: 'Submit a pending review for a pull request',
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
            description: 'The ID of the pending review',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'event',
            description: 'The review action to perform',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'body',
            description: 'The body text of the review',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'comments',
            description: 'JSON string of review comments',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    async execute(ctx, [owner, repo, pullNumber, reviewId, event, body, comments]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const reviewParams = {
                owner,
                repo,
                pull_number: pullNumber,
                review_id: reviewId,
                event: event,
                body: body || undefined,
                comments: comments ? JSON.parse(comments) : undefined,
            };
            const review = await github.rest.pulls.submitReview(reviewParams);
            return this.success(JSON.stringify(review.data, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubSubmitPullReview.js.map