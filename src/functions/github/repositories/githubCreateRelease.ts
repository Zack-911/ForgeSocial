import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubCreateRelease',
  description: 'Creates a new release',
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
      name: 'tagName',
      description: 'The name of the tag',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'targetCommitish',
      description:
        'Specifies the commitish value that determines where the Git tag is created from',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'name',
      description: 'The name of the release',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'body',
      description: 'Text describing the contents of the tag',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'draft',
      description: 'Whether to create a draft release',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'prerelease',
      description: 'Whether to identify the release as a prerelease',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'generateReleaseNotes',
      description: 'Whether to automatically generate the name and body for this release',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, tagName, targetCommitish, name, body, draft, prerelease, generateReleaseNotes],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      const release = await github.rest.repos.createRelease({
        owner,
        repo,
        tag_name: tagName,
        target_commitish: targetCommitish || undefined,
        name: name || undefined,
        body: body || undefined,
        draft: draft || false,
        prerelease: prerelease || false,
        generate_release_notes: generateReleaseNotes || false,
      });

      return this.success(JSON.stringify(release.data, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
