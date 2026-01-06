'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubGetPullReview',
  description: 'Get a specific pull request review',
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
      name: 'reviewId',
      description: 'The ID of the review',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo, pullNumber, reviewId]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const review = await github.rest.pulls.getReview({
        owner,
        repo,
        pull_number: pullNumber,
        review_id: reviewId,
      });
      return this.success(JSON.stringify(review.data, undefined, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubGetPullReview.js.map
