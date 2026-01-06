'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$githubDownloadArtifact',
  description: 'Downloads an artifact for a GitHub repository',
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
      name: 'artifactId',
      description: 'The ID of the artifact',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
    {
      name: 'path',
      description: 'The path to save the artifact',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [owner, repo, artifactId, path]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.downloadArtifact({
        owner,
        repo,
        artifact_id: artifactId,
        path,
        archive_format: 'zip',
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success((0, errorHandler_1.handleGitHubError)(e));
    }
  },
});
//# sourceMappingURL=githubDownloadArtifact.js.map
