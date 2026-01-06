import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

enum SearchLabelSort {
  Updated = 'updated',
  Created = 'created',
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export default new NativeFunction({
  name: '$githubSearchLabels',
  description: 'Search GitHub for labels',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'repository_id',
      description: 'The ID of the repository to search in',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
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
      enum: SearchLabelSort,
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
  async execute(ctx, [repository_id, query, sort, order, page, per_page]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.search.labels({
        q: query,
        sort: sort as SearchLabelSort,
        order: order as SortOrder,
        page,
        per_page,
        repository_id: repository_id,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
