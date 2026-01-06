'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubAuthenticatedUser',
  description: 'Get the authenticated user',
  unwrap: false,
  output: forgescript_1.ArgType.Json,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }
      const response = await github.users.getAuthenticated();
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubAuthenticatedUser.js.map
