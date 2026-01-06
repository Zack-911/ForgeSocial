'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
var Permission;
(function (Permission) {
  Permission['Pull'] = 'pull';
  Permission['Push'] = 'push';
  Permission['Admin'] = 'admin';
})(Permission || (Permission = {}));
exports.default = new forgescript_1.NativeFunction({
  name: '$githubAddCollaborator',
  description: 'Adds a collaborator to a repository',
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
      name: 'username',
      description: 'GitHub username of the collaborator',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'permission',
      description: 'Permission level',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.Enum,
      enum: Permission,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo, username, permission]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const invitation = await github.rest.repos.addCollaborator({
        owner,
        repo,
        username,
        permission: permission,
      });
      return this.success(JSON.stringify(invitation, undefined, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubAddCollaborator.js.map
