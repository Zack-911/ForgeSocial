import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubCheckFollowing',
  description: 'Check if the user is following the other user',
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
    {
      name: 'targetUsername',
      description: 'The username of the user to check',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [username, targetUsername]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.users.checkFollowingForUser({
        username,
        target_user: targetUsername,
      });
      return this.success(response);
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
