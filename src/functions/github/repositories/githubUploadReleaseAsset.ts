import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleGitHubError } from '../../../utils/errorHandler';
import * as fs from 'fs';
import * as path from 'path';

export default new NativeFunction({
  name: '$githubUploadReleaseAsset',
  description: 'Uploads an asset to a GitHub release',
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
      name: 'releaseId',
      description: 'The ID of the release',
      required: true,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'filePath',
      description: 'Path to the file to upload',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'assetName',
      description: 'Name to give the asset',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'contentType',
      description: 'MIME type of the asset (default: application/octet-stream)',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'label',
      description: 'Label for the asset',
      required: false,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, releaseId, filePath, assetName, contentType, label]: [
      string,
      string,
      number,
      string,
      string | null,
      string | null,
      string | null,
    ],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }

    try {
      // Resolve the file path relative to the current working directory
      const resolvedPath = path.resolve(filePath);

      // Read the file as a buffer
      const fileData = fs.readFileSync(resolvedPath);

      // Determine the asset name (use the filename if not provided)
      const name = assetName || path.basename(filePath);

      // Upload the asset
      const result = await github.rest.repos.uploadReleaseAsset({
        owner,
        repo,
        release_id: releaseId,
        name,
        label: label || undefined,
        data: fileData as unknown as string, // Type assertion needed for Octokit
        headers: {
          'content-type': contentType || 'application/octet-stream',
          'content-length': fileData.length,
        },
      });

      return this.success(
        JSON.stringify(
          {
            id: result.data.id,
            name: result.data.name,
            label: result.data.label,
            url: result.data.url,
            browser_download_url: result.data.browser_download_url,
          },
          undefined,
          2,
        ),
      );
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
