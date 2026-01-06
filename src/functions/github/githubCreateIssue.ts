import { ForgeSocial } from '../..';
import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubCreateIssue',
  description: 'Create a new issue in a GitHub repository',
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
      name: 'title',
      description: 'Issue title',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'body',
      description: 'Issue body',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'assignees',
      description: 'Comma-separated list of usernames to assign',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'labels',
      description: 'Comma-separated list of label names',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'milestone',
      description: 'Milestone ID to associate the issue with',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, title, body, assignees, labels, milestone]: [
      string,
      string,
      string,
      string | null,
      string | null,
      string | null,
      number | null,
    ],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const issue = await github.rest.issues.create({
        owner,
        repo,
        title,
        body: body || title,
        assignees: assignees ? assignees.split(',') : undefined,
        labels: labels ? labels.split(',') : undefined,
        milestone: milestone ? milestone : undefined,
      });
      return this.success(JSON.stringify(issue, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
