import { ForgeSocial } from '../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

enum ReviewSort {
  CREATED = 'created',
  UPDATED = 'updated',
  CREATED_AT = 'created_at',
}
enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

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
      type: ArgType.Enum,
      enum: ReviewSort,
      required: false,
      rest: false,
    },
    {
      name: 'direction',
      description: 'Sort direction',
      type: ArgType.Enum,
      enum: SortDirection,
      required: false,
      rest: false,
    },
    {
      name: 'perPage',
      description: 'Results per page',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'page',
      description: 'Page number of the results to fetch',
      type: ArgType.Number,
      required: false,
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
        sort: sort || ReviewSort.CREATED,
        direction: direction || SortDirection.DESC,
        per_page: perPage || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(reviews.data, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
