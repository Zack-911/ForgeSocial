'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubGetTeam',
  description: 'Get GitHub team',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'org',
      description: 'The organization to get team for',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'teamSlug',
      description: 'The team slug',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [org, teamSlug]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
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
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubGetTeam.js.map
