import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';
import { Itag, Quality, Type, Codec, Client } from '../../../utils/youtubeEnums';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export default new NativeFunction({
  name: '$youtubeDownload',
  description: 'Downloads a YouTube video to a file.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'video_id',
      description: 'The video ID to download.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'path',
      description: 'The file path to save the video.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'client',
      description: 'The client to use for downloading.',
      type: ArgType.Enum,
      enum: Client,
      required: false,
      rest: false,
    },
    {
      name: 'itag',
      description: 'The itag to get streaming data for.',
      type: ArgType.Enum,
      enum: Itag,
      required: false,
      rest: false,
    },
    {
      name: 'quality',
      description: 'The quality to get streaming data for.',
      type: ArgType.Enum,
      enum: Quality,
      required: false,
      rest: false,
    },
    {
      name: 'type',
      description: 'The type to get streaming data for.',
      type: ArgType.Enum,
      enum: Type,
      required: false,
      rest: false,
    },
    {
      name: 'language',
      description: 'The language to get streaming data for.',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'format',
      description: 'The format to get streaming data for.',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'codec',
      description: 'Video or audio codec identifier for the stream',
      type: ArgType.Enum,
      enum: Codec,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [video_id, path, client, itag, quality, type, language, format, codec]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) return this.customError('YouTube not configured or not found');
    console.log({
      itag: itag || undefined,
      quality: quality || Quality.BestEfficiency,
      type: type || Type.VideoAudio,
      language: language || 'original',
      format: format || 'any',
      codec: codec || undefined,
      client: client || undefined,
    });
    try {
      const stream = await youtube.download(video_id, {
        itag: itag || undefined,
        quality: quality || Quality.BestEfficiency,
        type: type || Type.VideoAudio,
        language: language || 'original',
        format: format || 'any',
        codec: codec || undefined,
        client: client || undefined,
      });

      // Ensure directory exists
      const fullPath = resolve(path);
      const dir = dirname(fullPath);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const nodeStream = require('stream').Readable.from(stream as unknown);

      await pipelineAsync(nodeStream, createWriteStream(fullPath));

      return this.success({
        path: fullPath,
        itag: itag || undefined,
        quality: quality || Quality.BestEfficiency,
        type: type || Type.VideoAudio,
        language: language || 'original',
        format: format || 'any',
        codec: codec || undefined,
        client: client || undefined,
      });
    } catch (error) {
      return this.success(handleYoutubeError({ status: true, error }));
    }
  },
});
