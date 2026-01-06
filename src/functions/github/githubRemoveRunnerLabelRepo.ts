import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$githubRemoveRunnerLabelRepo',
  description: 'Removes a custom label from a self-hosted runner for a repository',
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
      name: 'runnerId',
      description: 'The ID of the self-hosted runner',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'name',
      description: 'The name of the label to remove',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [owner, repo, runnerId, name]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.removeCustomLabelFromSelfHostedRunnerForRepo({
        owner,
        repo,
        runner_id: runnerId,
        name,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
