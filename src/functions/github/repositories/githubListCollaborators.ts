import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

enum Affiliation {
  Outside = 'outside',
  Direct = 'direct',
  All = 'all',
}

export default new NativeFunction({
  name: '$githubListCollaborators',
  description: 'Lists repository collaborators',
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
      name: 'affiliation',
      description: 'Filter collaborators by affiliation',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: Affiliation,
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
      description: 'Page number',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, affiliation, perPage, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const collaborators = await github.rest.repos.listCollaborators({
        owner,
        repo,
        affiliation: affiliation || Affiliation.All,
        per_page: perPage || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(collaborators.data, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
