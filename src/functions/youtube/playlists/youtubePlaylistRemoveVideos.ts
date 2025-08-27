import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistRemoveVideos',
  description: 'Remove videos from a YouTube playlist',
  unwrap: true,
  args: [
    {
      name: 'playlistId',
      description: 'The ID of the playlist to remove videos from',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'useSetVideoIds',
      description: 'Whether to use set video IDs (true) or playlist item IDs (false)',
      type: ArgType.Boolean,
      required: false,
      rest: false,
      default: false,
    },
    {
      name: 'videoIds',
      description: 'Comma-separated list of video IDs to remove from the playlist',
      type: ArgType.String,
      required: true,
      rest: true,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [playlistId, useSetVideoIds, videoIds]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.removeVideos(playlistId, videoIds, useSetVideoIds || undefined);
      return this.success(true);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
