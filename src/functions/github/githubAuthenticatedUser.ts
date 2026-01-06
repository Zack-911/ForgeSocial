import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubAuthenticatedUser',
  description: 'Get the authenticated user',
  unwrap: false,
  output: ArgType.Json,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.users.getAuthenticated();
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
