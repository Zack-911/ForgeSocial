import { ForgeSocial } from '../../../';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubCreateComment',
  description: 'Create a comment on an issue or pull request',
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
      name: 'issue_number',
      description: 'The issue number',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'body',
      description: 'The contents of the comment',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, issueNumber, body]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const result = await github.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
