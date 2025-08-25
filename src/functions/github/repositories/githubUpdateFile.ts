import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubUpdateFile',
  description: 'Creates or updates a file in a repository',
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
      description: 'The path where to create/update the file',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'message',
      description: 'Commit message',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'content',
      description: 'File content (will be base64 encoded)',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'sha',
      description: 'Blob SHA of the file being replaced (required for updates)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'branch',
      description: 'Branch name',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'committerName',
      description: 'Committer name',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'committerEmail',
      description: 'Committer email',
      required: false,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, path, message, content, sha, branch, committerName, committerEmail],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const committerInfo =
        committerName && committerEmail
          ? {
              name: committerName,
              email: committerEmail,
            }
          : undefined;

      const result = await github.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        sha: sha || undefined,
        branch: branch || undefined,
        committer: committerInfo,
        author: committerInfo,
      });

      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
