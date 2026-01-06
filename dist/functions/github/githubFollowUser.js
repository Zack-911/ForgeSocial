'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubFollowUser',
  description: 'Follow the user',
  brackets: true,
  unwrap: true,
  output: forgescript_1.ArgType.Boolean,
  args: [
    {
      name: 'username',
      description: 'The username of the user',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [username]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const github = ext.github;
      if (!github) {
        return this.customError('GitHub client not initialized');
      }
      const response = await github.users.follow({
        username,
      });
      return this.success(response);
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubFollowUser.js.map
