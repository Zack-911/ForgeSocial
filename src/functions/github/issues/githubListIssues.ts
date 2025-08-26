import { ForgeSocial } from '../../../';
import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListIssues',
  description: 'List issues in a GitHub repository',
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
      name: 'milestone',
      description:
        'Milestone number, or * for issues with any milestone, or none for issues without milestones',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'state',
      description: 'State of the issues to return (open, closed, all)',
      required: false,
      rest: false,
      type: ArgType.String,
      default: 'open',
    },
    {
      name: 'assignee',
      description: 'Filter by assignee (username, * for assigned to any, none for no assignee)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'creator',
      description: 'Filter by creator (username)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'mentioned',
      description: 'Filter by mentioned user (username)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'labels',
      description: 'Comma-separated list of label names',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'sort',
      description: 'What to sort results by (created, updated, comments)',
      required: false,
      rest: false,
      type: ArgType.String,
      default: 'created',
    },
    {
      name: 'direction',
      description: 'Direction of sort (asc, desc)',
      required: false,
      rest: false,
      type: ArgType.String,
      default: 'desc',
    },
    {
      name: 'since',
      description: 'Only show notifications updated after the given time (ISO 8601 format)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, milestone, state, assignee, creator, mentioned, labels, sort, direction, since],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const result = await github.rest.issues.listForRepo({
        owner,
        repo,
        milestone: milestone || undefined,
        state: (state as 'open' | 'closed' | 'all' | null) || 'open',
        assignee: assignee || undefined,
        creator: creator || undefined,
        mentioned: mentioned || undefined,
        labels: labels || undefined,
        sort: (sort as 'created' | 'updated' | 'comments' | null) || 'created',
        direction: (direction as 'asc' | 'desc' | null) || 'desc',
        since: since || undefined,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
