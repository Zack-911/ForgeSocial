import { ForgeSocial } from '../../../';
import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubDeleteComment',
  description: 'Delete a comment on an issue or pull request',
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
      name: 'comment_id',
      description: 'The ID of the comment to delete',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, comment_id]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const result = await github.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: comment_id,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
