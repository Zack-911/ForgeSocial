import { ForgeSocial } from '../../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubUpdatePullReview',
  description: 'Update the body text of a review that has not been submitted',
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
      name: 'pullNumber',
      description: 'The pull request number',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'reviewId',
      description: 'The ID of the review',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'body',
      description: 'The updated body text of the review',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, pullNumber, reviewId, body]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
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
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
