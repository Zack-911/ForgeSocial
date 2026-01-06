'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubListBranches',
  description: 'Lists branches for a repository',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'owner',
      description: 'The owner of the repository',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'repo',
      description: 'The name of the repository',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'perPage',
      description: 'Number of results per page (default: 30, max: 100)',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
    {
      name: 'page',
      description: 'Page number',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo, perPage, page]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const branches = await github.rest.repos.listBranches({
        owner,
        repo,
        per_page: perPage ?? 30,
        page: page ?? 1,
      });
      return this.success(JSON.stringify(branches, undefined, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubListBranches.js.map
