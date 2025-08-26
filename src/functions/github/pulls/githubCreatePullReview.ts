import { ForgeSocial } from '../../../';
import { ArgType, NativeFunction } from '@tryforge/forgescript';
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
      name: 'event',
      description: 'The review action (APPROVE, REQUEST_CHANGES, COMMENT)',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'body',
      description: 'The body text of the review',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'comments',
      description: 'Review comments as JSON string',
      required: false,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, pullNumber, event, body, comments]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const reviewParams: {
        owner: string;
        repo: string;
        pull_number: number;
        event: ReviewEvent;
        body?: string;
        comments?: ReviewComment[];
      } = {
        owner,
        repo,
        pull_number: pullNumber,
        event: event as ReviewEvent,
        body: body || undefined,
      };

      if (comments) {
        try {
          const parsedComments = JSON.parse(comments);
          if (Array.isArray(parsedComments)) {
            reviewParams.comments = parsedComments as ReviewComment[];
          } else {
            return this.customError('Comments must be an array of review comment objects');
          }
        } catch (e) {
          return this.customError('Error parsing comments' + e);
        }
      }

      const review = await github.rest.pulls.createReview(reviewParams);
      return this.success(JSON.stringify(review.data, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
