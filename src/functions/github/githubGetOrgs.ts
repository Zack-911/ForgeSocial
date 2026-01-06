import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubGetOrgs',
  description: 'Get GitHub organizations',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'org',
      description: 'The organization to get',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [org]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.orgs.get({ org });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
