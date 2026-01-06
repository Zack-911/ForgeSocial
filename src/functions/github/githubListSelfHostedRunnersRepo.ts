import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListSelfHostedRunnersRepo',
  description: 'Lists all self-hosted runners for a repository',
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
      name: 'perPage',
      description: 'Results per page (max 100)',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'page',
      description: 'Page number of the results to fetch',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, perPage, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.listSelfHostedRunnersForRepo({
        owner,
        repo,
        per_page: perPage || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
