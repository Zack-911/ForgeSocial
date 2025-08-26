import { ForgeSocial } from '../../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

type ReviewSort = 'created' | 'updated' | 'created_at';
type SortDirection = 'asc' | 'desc';

export default new NativeFunction({
  name: '$githubListPullReviews',
  description: 'List reviews for a pull request',
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
      name: 'sort',
      description: 'How to sort the results',
      type: ArgType.String,
      required: false,
      default: 'created',
      rest: false,
    },
    {
      name: 'direction',
      description: 'Sort direction',
      type: ArgType.String,
      required: false,
      default: 'desc',
      rest: false,
    },
    {
      name: 'perPage',
      description: 'Results per page (max 100)',
      type: ArgType.Number,
      required: false,
      default: 30,
      rest: false,
    },
    {
      name: 'page',
      description: 'Page number of the results to fetch',
      type: ArgType.Number,
      required: false,
      default: 1,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, pullNumber, sort, direction, perPage, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const reviews = await github.rest.pulls.listReviews({
        owner,
        repo,
        pull_number: pullNumber,
        sort: (sort as ReviewSort) || 'created',
        direction: (direction as SortDirection) || 'desc',
        per_page: perPage || 30,
        page: page || 1,
      });
      return this.success(JSON.stringify(reviews.data, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
