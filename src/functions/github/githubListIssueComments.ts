import { ForgeSocial } from '../..';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListIssueComments',
  description: 'List comments on an issue',
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
      name: 'issue_number',
      description: 'The issue number',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'since',
      description: 'Only show notifications updated after the given time',
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
  async execute(ctx, [owner, repo, issue_number, since, per_page, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const result = await github.rest.issues.listComments({
        owner,
        repo,
        issue_number,
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
