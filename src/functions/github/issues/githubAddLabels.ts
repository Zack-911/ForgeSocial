import { ForgeSocial } from '../../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubAddLabels',
  description: 'Add labels to an issue in a GitHub repository',
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
      name: 'labels',
      description: 'Comma-separated list of labels to add',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, issueNumber, labels]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const labelArray = labels.split(',').map((l) => l.trim());
      const result = await github.rest.issues.addLabels({
        owner,
        repo,
        issue_number: issueNumber,
        labels: labelArray,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
