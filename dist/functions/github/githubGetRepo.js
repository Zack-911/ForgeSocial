'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubGetRepo',
  description: 'Gets a repository',
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
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const repository = await github.rest.repos.get({
        owner,
        repo,
      });
      return this.success(JSON.stringify(repository, undefined, 2));
    } catch (error) {
      const errorMessage = (0, errorHandler_1.handleGitHubError)(error);
      return this.success(errorMessage);
    }
  },
});
//# sourceMappingURL=githubGetRepo.js.map
