import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubRerunFailedJobs',
  description: 'Reruns all failed jobs in a workflow run',
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
      name: 'enableDebugLogging',
      description: 'Whether to enable debug logging for the re-run',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, runId, enableDebugLogging]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.reRunWorkflowFailedJobs({
        owner,
        repo,
        run_id: runId,
        enable_debug_logging: enableDebugLogging || false,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
