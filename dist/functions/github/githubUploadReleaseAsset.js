'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
const fs = __importStar(require('fs'));
const path = __importStar(require('path'));
exports.default = new forgescript_1.NativeFunction({
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
      name: 'releaseId',
      description: 'The ID of the release',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.Number,
    },
    {
      name: 'filePath',
      description: 'Path to the file to upload',
      required: true,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'assetName',
      description: 'Name to give the asset',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'contentType',
      description: 'MIME type of the asset (default: application/octet-stream)',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
    {
      name: 'label',
      description: 'Label for the asset',
      required: false,
      rest: false,
      type: forgescript_1.ArgType.String,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, args) {
    const [owner, repo, releaseId, filePath, assetName, contentType, label] = args;
    const ext = ctx.client.getExtension('ForgeSocial');
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
        name: assetName,
        data: fileData, // Type assertion to handle Buffer type
        headers: {
          'content-type': contentType || 'application/octet-stream',
          'content-length': fileData.length,
        },
        label: label || undefined,
      });
      return this.success(JSON.stringify(response, undefined, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleGitHubError)(error));
    }
  },
});
//# sourceMappingURL=githubUploadReleaseAsset.js.map
