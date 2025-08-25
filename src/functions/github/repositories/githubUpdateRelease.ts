import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubUpdateRelease',
  description: 'Updates an existing GitHub release',
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
      name: 'releaseId',
      description: 'The ID of the release to update',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'tagName',
      description: 'The new tag name',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'name',
      description: 'The new release name',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'body',
      description: 'The new release description',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'draft',
      description: 'Whether the release is a draft',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'prerelease',
      description: 'Whether the release is a prerelease',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, releaseId, tagName, name, body, draft, prerelease]: [
      string,
      string,
      number,
      string | null,
      string | null,
      string | null,
      boolean | null,
      boolean | null,
    ],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const response = await github.rest.repos.updateRelease({
        owner,
        repo,
        release_id: releaseId,
        tag_name: tagName || undefined,
        name: name || undefined,
        body: body || undefined,
        draft: draft || undefined,
        prerelease: prerelease || undefined,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
