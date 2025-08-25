import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleGitHubError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubDispatchWorkflow',
  description: 'Dispatches a workflow run for a GitHub repository',
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
      name: 'workflowId',
      description: 'The ID or filename of the workflow, e.g., main.yml',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'ref',
      description: 'The git ref (branch or tag) to run the workflow on',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'inputs',
      description: 'Optional JSON string of inputs for the workflow run',
      required: false,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.String,
  async execute(ctx, [owner, repo, workflowId, ref, inputs]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    let parsedInputs: Record<string, unknown> | undefined;
    if (inputs) {
      try {
        parsedInputs = JSON.parse(inputs);
      } catch {
        return this.customError('Invalid JSON provided for inputs');
      }
    }

    try {
      const result = await github.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id: workflowId,
        ref,
        inputs: parsedInputs,
      });
      return this.success(JSON.stringify(result, null, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
