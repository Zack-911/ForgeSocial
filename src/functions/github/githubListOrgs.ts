import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListOrgs',
  description: 'List GitHub organizations',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'user',
      description: 'The user to list organizations for',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'per_page',
      description: 'The number of results per page',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'page',
      description: 'The page number',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [user, per_page, page]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      if (user) {
        const response = await github.orgs.listForUser({
          username: user,
          per_page: per_page || undefined,
          page: page || undefined,
        });
        return this.success(JSON.stringify(response, undefined, 2));
      }

      const response = await github.orgs.listForAuthenticatedUser({
        per_page: per_page || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
