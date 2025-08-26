import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';
import { GitignoreTemplate, LicenseTemplate } from '../../../utils/githubEnums';

export default new NativeFunction({
  name: '$githubCreateRepoOrg',
  description: 'Creates a new repository in an organization',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'org',
      description: 'The organization name',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'name',
      description: 'Repository name',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'description',
      description: 'Repository description',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'homepage',
      description: 'Repository homepage URL',
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
      name: 'autoInit',
      description: 'Initialize repository with a README',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
    {
      name: 'gitignoreTemplate',
      description: 'Git ignore template',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: GitignoreTemplate,
    },
    {
      name: 'licenseTemplate',
      description: 'License template',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: LicenseTemplate,
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
      org,
      name,
      description,
      homepage,
      isPrivate,
      hasIssues,
      hasProjects,
      hasWiki,
      teamId,
      autoInit,
      gitignoreTemplate,
      licenseTemplate,
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
      const result = await github.rest.repos.createInOrg({
        org,
        name,
        description: description || undefined,
        homepage: homepage || undefined,
        private: isPrivate || false,
        has_issues: hasIssues ?? true,
        has_projects: hasProjects ?? true,
        has_wiki: hasWiki ?? true,
        auto_init: autoInit || false,
        team_id: teamId || undefined,
        gitignore_template: gitignoreTemplate || undefined,
        license_template: licenseTemplate || undefined,
        allow_squash_merge: allowSquashMerge || false,
        allow_merge_commit: allowMergeCommit || false,
        allow_rebase_merge: allowRebaseMerge || false,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
