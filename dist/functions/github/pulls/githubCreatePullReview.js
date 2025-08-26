"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubCreatePullReview',
    description: 'Create a review for a pull request',
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
            name: 'pullNumber',
            description: 'The pull request number',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'event',
            description: 'The review action (APPROVE, REQUEST_CHANGES, COMMENT)',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'body',
            description: 'The body text of the review',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'comments',
            description: 'Review comments as JSON string',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, pullNumber, event, body, comments]) {
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
                event: event,
                body: body || undefined,
            };
            if (comments) {
                try {
                    const parsedComments = JSON.parse(comments);
                    if (Array.isArray(parsedComments)) {
                        reviewParams.comments = parsedComments;
                    }
                    else {
                        return this.customError('Comments must be an array of review comment objects');
                    }
                }
                catch (e) {
                    return this.customError('Error parsing comments' + e);
                }
            }
            const review = await github.rest.pulls.createReview(reviewParams);
            return this.success(JSON.stringify(review.data, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubCreatePullReview.js.map