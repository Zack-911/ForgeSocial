import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleYoutubeError } from '../../../utils/errorHandler';
export default new NativeFunction({
  name: '$youtubeGetBasicInfo',
  description: 'Retrieves basic information about a YouTube video.',
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
  ],
  async execute(ctx, [videoId]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }

    try {
      const info = await youtube.getBasicInfo(videoId);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
