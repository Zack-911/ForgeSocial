import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubCancelWorkflowRun',
  description: 'Cancels a workflow run for a GitHub repository',
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
      name: 'force',
      description: 'Force cancel the workflow run',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, runId, force]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      if (force) {
        const run = await github.actions.forceCancelWorkflowRun({
          owner,
          repo,
          run_id: runId,
        });
        return this.success(JSON.stringify(run, undefined, 2));
      } else {
        const run = await github.actions.cancelWorkflowRun({
          owner,
          repo,
          run_id: runId,
        });
        return this.success(JSON.stringify(run, undefined, 2));
      }
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
