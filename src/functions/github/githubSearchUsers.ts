import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

enum SearchUsersSort {
  Followers = 'followers',
  Repos = 'repositories',
  Joined = 'joined',
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export default new NativeFunction({
  name: '$githubSearchUsers',
  description: 'Search GitHub for users',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The search query',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'sort',
      description: 'The sort order',
      type: ArgType.Enum,
      enum: SearchUsersSort,
      required: true,
      rest: false,
    },
    {
      name: 'order',
      description: 'The order of the results',
      type: ArgType.Enum,
      enum: SortOrder,
      required: true,
      rest: false,
    },
    {
      name: 'page',
      description: 'The page of the results',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'per_page',
      description: 'The number of results per page',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [query, sort, order, page, per_page]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.search.users({
        q: query,
        sort: sort as SearchUsersSort,
        order: order as SortOrder,
        page,
        per_page,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
