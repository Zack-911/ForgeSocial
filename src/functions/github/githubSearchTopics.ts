import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

enum SearchTopicSort {
  Updated = 'updated',
  Created = 'created',
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export default new NativeFunction({
  name: '$githubSearchTopics',
  description: 'Search GitHub for topics',
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
      enum: SearchTopicSort,
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

      const response = await github.search.topics({
        q: query,
        sort: sort as SearchTopicSort,
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
