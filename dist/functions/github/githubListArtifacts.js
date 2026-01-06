'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubListArtifacts',
  description: 'Lists artifacts for a GitHub repository',
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
      name: 'artifactName',
      description:
        'The name of the artifact. When provided, only artifacts with this name will be returned.',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'limit',
      description: 'The maximum number of artifacts to return.',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
    {
      name: 'page',
      description: 'The page of artifacts to return.',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo, artifactName, limit, page]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.listArtifactsForRepo({
        owner,
        repo,
        artifact_name: artifactName || undefined,
        limit: limit || undefined,
        page: page || undefined,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success((0, errorHandler_1.handleGitHubError)(e));
    }
  },
});
//# sourceMappingURL=githubListArtifacts.js.map
