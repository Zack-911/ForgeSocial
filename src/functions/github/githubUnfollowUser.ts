import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubUnfollowUser',
  description: 'Unfollow the user',
  brackets: true,
  unwrap: true,
  output: ArgType.Boolean,
  args: [
    {
      name: 'username',
      description: 'The username of the user',
      type: ArgType.String,
      required: true,
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

      const response = await github.users.unfollow({
        username,
      });
      return this.success(response);
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
