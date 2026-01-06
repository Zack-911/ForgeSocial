import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListTeams',
  description: 'List GitHub teams',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'org',
      description: 'The organization to list teams for',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'perPage',
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
  async execute(ctx, [org, perPage, page]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.teams.list({
        org,
        per_page: perPage || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
