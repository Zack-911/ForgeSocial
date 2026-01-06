import { ForgeSocial } from '../..';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubUpdateIssue',
  description: 'Update an existing issue in a GitHub repository',
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
      description: 'Issue number',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'title',
      description: 'New issue title',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'body',
      description: 'New issue description',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'assignee',
      description: 'GitHub username of the assignee',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'assignees',
      description: 'List of assignees (comma-separated)',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'labels',
      description: 'List of labels (comma-separated)',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'milestone',
      description: 'Milestone number',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, issue_number, title, body, assignee, assignees, labels, milestone],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.rest.issues.update({
        owner,
        repo,
        issue_number,
        title: title || undefined,
        body: body || undefined,
        assignee: assignee || undefined,
        assignees: assignees ? assignees.split(',') : undefined,
        labels: labels ? labels.split(',') : undefined,
        milestone: milestone || undefined,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
