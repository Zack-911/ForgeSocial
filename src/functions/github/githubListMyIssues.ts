import { ForgeSocial } from '../..';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

enum IssueState {
  Open = 'open',
  Closed = 'closed',
  All = 'all',
}
enum IssueFilter {
  Assigned = 'assigned',
  Created = 'created',
  Mentioned = 'mentioned',
  Subscribed = 'subscribed',
  All = 'all',
}
enum IssueSort {
  Created = 'created',
  Updated = 'updated',
  Comments = 'comments',
}
enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export default new NativeFunction({
  name: '$githubListMyIssues',
  description: 'Lists issues assigned to the authenticated user across all repositories',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'filter',
      description:
        'Filter to determine which issues are returned (assigned, created, mentioned, subscribed, all)',
      type: ArgType.Enum,
      enum: IssueFilter,
      required: false,
      rest: false,
    },
    {
      name: 'state',
      description: 'State of the issues to return (open, closed, all)',
      type: ArgType.Enum,
      enum: IssueState,
      required: false,
      rest: false,
    },
    {
      name: 'labels',
      description: 'Comma-separated list of label names to filter by',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'sort',
      description: 'How to sort the results (created, updated, comments)',
      type: ArgType.Enum,
      enum: IssueSort,
      required: false,
      rest: false,
    },
    {
      name: 'direction',
      description: 'Sort direction (asc, desc)',
      type: ArgType.Enum,
      enum: SortDirection,
      required: false,
      rest: false,
    },
    {
      name: 'since',
      description: 'Only show notifications updated after the given time (ISO 8601 format)',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'per_page',
      description: 'Results per page (max 100)',
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
  async execute(ctx, [filter, state, labels, sort, direction, since, per_page, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const result = await github.rest.issues.listForAuthenticatedUser({
        filter: (filter as IssueFilter) || IssueFilter.Assigned,
        state: (state as IssueState) || IssueState.Open,
        labels: labels || undefined,
        sort: (sort as IssueSort) || IssueSort.Created,
        direction: (direction as SortDirection) || SortDirection.Desc,
        since: since || undefined,
        per_page: per_page || 30,
        page: page || 1,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
