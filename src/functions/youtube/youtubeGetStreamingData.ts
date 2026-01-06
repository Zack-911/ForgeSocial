import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';
import { Itag, Quality, Type, Codec } from '../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$youtubeGetStreamingData',
  description: 'Gets streaming data.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'video_id',
      description: 'The video ID to get streaming data for.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'itag',
      description: 'Theitag to get streaming data for.',
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
  async execute(ctx, [video_id, itag, quality, type, language, format, codec]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }

    try {
      const info = await youtube.getStreamingData(video_id, {
        itag: itag || undefined,
        quality: quality || Quality.BestEfficiency,
        type: type || undefined,
        language: language || 'original',
        format: format || 'any',
        codec: codec || undefined,
      });
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
