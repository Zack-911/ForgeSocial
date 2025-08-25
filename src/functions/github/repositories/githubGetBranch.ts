import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubGetBranch',
  description: 'Gets a specific branch from a repository',
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
      name: 'branch',
      description: 'The name of the branch',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, branch]: [string, string, string]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const branchData = await github.rest.repos.getBranch({
        owner,
        repo,
        branch,
      });
      return this.success(JSON.stringify(branchData.data, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
