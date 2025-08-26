import { ForgeSocial } from '../../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

type ReviewEvent = 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT';

interface ReviewComment {
  path: string;
  position?: number;
  body: string;
  line?: number;
  side?: string;
  start_line?: number;
  start_side?: string;
}

export default new NativeFunction({
  name: '$githubSubmitPullReview',
  description: 'Submit a pending review for a pull request',
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
      description: 'The ID of the pending review',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'event',
      description: 'The review action to perform',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'body',
      description: 'The body text of the review',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'comments',
      description: 'JSON string of review comments',
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [owner, repo, pullNumber, reviewId, event, body, comments]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
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
        event: event as ReviewEvent,
        body: body || undefined,
        comments: comments ? (JSON.parse(comments) as ReviewComment[]) : undefined,
      };

      const review = await github.rest.pulls.submitReview(reviewParams);
      return this.success(JSON.stringify(review.data, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
