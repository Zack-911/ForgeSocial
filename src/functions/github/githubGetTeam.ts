import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubGetTeam',
  description: 'Get GitHub team',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'org',
      description: 'The organization to get team for',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'teamSlug',
      description: 'The team slug',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [org, teamSlug]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }

      const response = await github.teams.getByName({
        org,
        team_slug: teamSlug,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
