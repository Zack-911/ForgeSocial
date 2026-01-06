'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubListOrgs',
  description: 'List GitHub organizations',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'user',
      description: 'The user to list organizations for',
      type: forgescript_1.ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'per_page',
      description: 'The number of results per page',
      type: forgescript_1.ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'page',
      description: 'The page number',
      type: forgescript_1.ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [user, per_page, page]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
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
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubListOrgs.js.map
