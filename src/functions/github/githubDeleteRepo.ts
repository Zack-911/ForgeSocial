import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubDeleteRepo',
  description: 'Deletes a repository',
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
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.rest.repos.delete({
        owner,
        repo,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
