'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
const youtubeEnums_1 = require('../../utils/youtubeEnums');
const fs_1 = require('fs');
const path_1 = require('path');
const stream_1 = require('stream');
const util_1 = require('util');
const pipelineAsync = (0, util_1.promisify)(stream_1.pipeline);
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubeDownload',
  description: 'Downloads a YouTube video to a file.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'video_id',
      description: 'The video ID to download.',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'path',
      description: 'The file path to save the video.',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'client',
      description: 'The client to use for downloading.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Client,
      required: false,
      rest: false,
    },
    {
      name: 'itag',
      description: 'The itag to get streaming data for.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Itag,
      required: false,
      rest: false,
    },
    {
      name: 'quality',
      description: 'The quality to get streaming data for.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Quality,
      required: false,
      rest: false,
    },
    {
      name: 'type',
      description: 'The type to get streaming data for.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Type,
      required: false,
      rest: false,
    },
    {
      name: 'language',
      description: 'The language to get streaming data for.',
      type: forgescript_1.ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'format',
      description: 'The format to get streaming data for.',
      type: forgescript_1.ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'codec',
      description: 'Video or audio codec identifier for the stream',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Codec,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [video_id, path, client, itag, quality, type, language, format, codec]) {
    const ext = ctx.getExtension('ForgeSocial');
    const youtube = ext.youtube;
    if (!youtube) return this.customError('YouTube not configured or not found');
    console.log({
      itag: itag || undefined,
      quality: quality || youtubeEnums_1.Quality.BestEfficiency,
      type: type || youtubeEnums_1.Type.VideoAudio,
      language: language || 'original',
      format: format || 'any',
      codec: codec || undefined,
      client: client || undefined,
    });
    try {
      const stream = await youtube.download(video_id, {
        itag: itag || undefined,
        quality: quality || youtubeEnums_1.Quality.BestEfficiency,
        type: type || youtubeEnums_1.Type.VideoAudio,
        language: language || 'original',
        format: format || 'any',
        codec: codec || undefined,
        client: client || undefined,
      });
      // Ensure directory exists
      const fullPath = (0, path_1.resolve)(path);
      const dir = (0, path_1.dirname)(fullPath);
      if (!(0, fs_1.existsSync)(dir)) (0, fs_1.mkdirSync)(dir, { recursive: true });
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const nodeStream = require('stream').Readable.from(stream);
      await pipelineAsync(nodeStream, (0, fs_1.createWriteStream)(fullPath));
      return this.success({
        path: fullPath,
        itag: itag || undefined,
        quality: quality || youtubeEnums_1.Quality.BestEfficiency,
        type: type || youtubeEnums_1.Type.VideoAudio,
        language: language || 'original',
        format: format || 'any',
        codec: codec || undefined,
        client: client || undefined,
      });
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)({ status: true, error }));
    }
  },
});
//# sourceMappingURL=youtubeDownload.js.map
