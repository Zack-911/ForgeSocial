import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubGetFileContent',
  description: 'Gets the content of a file from a repository',
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
      name: 'path',
      description: 'The path to the file',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'ref',
      description: 'Git reference (branch, commit, or tag)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.String,
  async execute(ctx, [owner, repo, path, ref]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const content = await github.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: ref || undefined,
      });

      return this.success(JSON.stringify(content, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
