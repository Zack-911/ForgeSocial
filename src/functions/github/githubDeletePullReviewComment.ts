import { ForgeSocial } from '../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubDeletePullReviewComment',
  description: 'Delete a pull request review comment',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'owner',
      description: 'Repository owner',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'repo',
      description: 'Repository name',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'commentId',
      description: 'The ID of the comment to delete',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, commentId]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
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
      return this.success(handleGitHubError(error));
    }
  },
});
