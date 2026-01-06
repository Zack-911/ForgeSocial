import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleGitHubError } from '../../utils/errorHandler';
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
    args: [string, string, number, string, string | null, string | null, string | null],
  ) {
    const [owner, repo, releaseId, filePath, assetName, contentType, label] = args;
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

      // Upload the asset
      const response = await github.rest.repos.uploadReleaseAsset({
        owner,
        repo,
        release_id: releaseId,
        name: assetName as string,
        data: fileData as unknown as string, // Type assertion to handle Buffer type
        headers: {
          'content-type': contentType || 'application/octet-stream',
          'content-length': fileData.length,
        },
        label: (label as string) || undefined,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success(handleGitHubError(error));
    }
  },
});
