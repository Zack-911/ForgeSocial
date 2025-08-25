import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

enum Permission {
  Pull = 'pull',
  Push = 'push',
  Admin = 'admin',
}

export default new NativeFunction({
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
      type: ArgType.String,
    },
    {
      name: 'repo',
      description: 'The name of the repository',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'username',
      description: 'GitHub username of the collaborator',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'permission',
      description: 'Permission level',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: Permission,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, username, permission]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      await github.rest.repos.addCollaborator({
        owner,
        repo,
        username,
        permission: permission || 'push',
      });
      return this.success(JSON.stringify({ success: true }, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
