'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubDeletePullReviewComment',
  description: 'Delete a pull request review comment',
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
      name: 'commentId',
      description: 'The ID of the comment to delete',
      type: forgescript_1.ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo, commentId]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.rest.pulls.deleteReviewComment({
        owner,
        repo,
        comment_id: commentId,
      });
      return this.success(JSON.stringify(result.data, undefined, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubDeletePullReviewComment.js.map
