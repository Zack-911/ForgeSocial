import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubDownloadArtifact',
  description: 'Downloads an artifact for a GitHub repository',
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
      name: 'artifactId',
      description: 'The ID of the artifact',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'path',
      description: 'The path to save the artifact',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, artifactId, path]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.downloadArtifact({
        owner,
        repo,
        artifact_id: artifactId,
        path,
        archive_format: 'zip',
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
