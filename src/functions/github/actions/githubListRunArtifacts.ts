import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubListRunArtifacts',
  description: 'Lists artifacts for a workflow run',
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
      name: 'runId',
      description: 'The ID of the workflow run',
      required: true,
      rest: false,
      type: ArgType.Number,
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
  async execute(ctx, [owner, repo, runId, perPage, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const artifacts = await github.actions.listWorkflowRunArtifacts({
        owner,
        repo,
        run_id: runId,
        per_page: perPage || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(artifacts.data, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
