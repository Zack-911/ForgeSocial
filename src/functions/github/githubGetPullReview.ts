import { ForgeSocial } from '../../';
import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
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
      type: ArgType.String,
    },
    {
      name: 'repo',
      description: 'The name of the repository',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'pullNumber',
      description: 'The pull request number',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'reviewId',
      description: 'The ID of the review',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, pullNumber, reviewId]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
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
      return this.success(handleGitHubError(error));
    }
  },
});
