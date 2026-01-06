'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
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
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'repo',
      description: 'The name of the repository',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'workflowId',
      description: 'The ID or filename of the workflow, e.g., main.yml',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'ref',
      description: 'The git ref (branch or tag) to run the workflow on',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'inputs',
      description: 'Optional JSON string of inputs for the workflow run',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
  ],
  output: forgescript_1.ArgType.String,
  async execute(ctx, [owner, repo, workflowId, ref, inputs]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    let parsedInputs;
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
      return this.success((0, errorHandler_1.handleGitHubError)(e));
    }
  },
});
//# sourceMappingURL=githubDispatchWorkflow.js.map
