import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleGitHubError } from '../../../utils/errorHandler';
export default new NativeFunction({
  name: '$githubListArtifacts',
  description: 'Lists artifacts for a GitHub repository',
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
      name: 'artifactName',
      description:
        'The name of the artifact. When provided, only artifacts with this name will be returned.',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'limit',
      description: 'The maximum number of artifacts to return.',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'page',
      description: 'The page of artifacts to return.',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, artifactName, limit, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const artifacts = await github.actions.listArtifactsForRepo({
        owner,
        repo,
        artifact_name: artifactName || undefined,
        limit: limit || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(artifacts, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
