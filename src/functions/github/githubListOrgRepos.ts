import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

enum RepoType {
  All = 'all',
  Public = 'public',
  Private = 'private',
  Forks = 'forks',
  Sources = 'sources',
  Member = 'member',
}

enum SortType {
  Created = 'created',
  Updated = 'updated',
  Pushed = 'pushed',
  FullName = 'full_name',
}

enum DirectionType {
  Asc = 'asc',
  Desc = 'desc',
}

export default new NativeFunction({
  name: '$githubListOrgRepos',
  description: 'Lists organization repositories',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'org',
      description: 'The organization name',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'type',
      description: 'Type of repositories to list',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: RepoType,
    },
    {
      name: 'sort',
      description: 'Sorting criterion',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: SortType,
    },
    {
      name: 'direction',
      description: 'Sorting direction',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: DirectionType,
    },
    {
      name: 'perPage',
      description: 'Results per page (max 100)',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'page',
      description: 'Page number',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [org, type, sort, direction, perPage, page]: [
      string,
      RepoType | null,
      SortType | null,
      DirectionType | null,
      number | null,
      number | null,
    ],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const repos = await github.rest.repos.listForOrg({
        org,
        type: type ? (type as RepoType) : undefined,
        sort: sort ? (sort as SortType) : undefined,
        direction: direction ? (direction as DirectionType) : undefined,
        per_page: perPage ?? undefined,
        page: page ?? undefined,
      });
      return this.success(JSON.stringify(repos, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
