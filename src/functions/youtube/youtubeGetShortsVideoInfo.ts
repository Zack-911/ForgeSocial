import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';
import { Client } from '../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$youtubeGetShortsVideoInfo',
  description: 'Retrieves information about a YouTube Shorts video.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'videoId',
      description: 'The ID of the video to retrieve information for.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'client',
      description: 'The client to use.',
      type: ArgType.Enum,
      enum: Client,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [videoId, client]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }

    try {
      const info = await youtube.getShortsVideoInfo(videoId, client || undefined);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
