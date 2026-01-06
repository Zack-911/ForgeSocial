import { ForgeSocial } from '../..';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubRemoveAssignees',
  description: 'Remove assignees from a GitHub issue',
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
      name: 'assignees',
      description: 'Comma-separated list of usernames to remove as assignees',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, issue_number, assignees]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const assigneeArray = assignees.split(',').map((a) => a.trim());
      const result = await github.rest.issues.removeAssignees({
        owner,
        repo,
        issue_number,
        assignees: assigneeArray,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
