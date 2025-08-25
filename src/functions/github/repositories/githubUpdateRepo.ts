import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubUpdateRepo',
  description: 'Updates a repository',
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
      name: 'name',
      description: 'New repository name',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'description',
      description: 'New repository description',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'homepage',
      description: 'New repository homepage URL',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'private',
      description: 'Whether the repository should be private',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'hasIssues',
      description: 'Enable issues for the repository',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'hasProjects',
      description: 'Enable projects for the repository',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'hasWiki',
      description: 'Enable wiki for the repository',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'teamId',
      description: 'Team ID to grant access',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'allowSquashMerge',
      description: 'Allow squash merging',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'allowMergeCommit',
      description: 'Allow merge commits',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'allowRebaseMerge',
      description: 'Allow rebase merging',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [
      owner,
      repo,
      name,
      description,
      homepage,
      isPrivate,
      hasIssues,
      hasProjects,
      hasWiki,
      teamId,
      allowSquashMerge,
      allowMergeCommit,
      allowRebaseMerge,
    ],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const updatedRepo = await github.rest.repos.update({
        owner,
        repo,
        name: name || undefined,
        description: description || undefined,
        homepage: homepage || undefined,
        private: isPrivate || undefined,
        has_issues: hasIssues || undefined,
        has_projects: hasProjects || undefined,
        has_wiki: hasWiki || undefined,
        team_id: teamId || undefined,
        allow_squash_merge: allowSquashMerge || undefined,
        allow_merge_commit: allowMergeCommit || undefined,
        allow_rebase_merge: allowRebaseMerge || undefined,
      });
      return this.success(JSON.stringify(updatedRepo.data, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
