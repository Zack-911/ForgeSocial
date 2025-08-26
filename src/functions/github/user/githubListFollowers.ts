import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListFollowers',
  description: 'Get the followers of the user',
  brackets: false,
  unwrap: true,
  output: ArgType.Json,
  args: [
    {
      name: 'username',
      description: 'The username of the user',
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [username]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      if (username) {
        const response = await github.users.listFollowersForUser({
          username,
        });
        return this.success(JSON.stringify(response, undefined, 2));
      } else {
        const response = await github.users.listFollowersForAuthenticatedUser();
        return this.success(JSON.stringify(response, undefined, 2));
      }
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
