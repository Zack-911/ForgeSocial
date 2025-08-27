import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistAddVideos',
  description: 'Add videos to a YouTube playlist',
  unwrap: true,
  args: [
    {
      name: 'playlist_id',
      description: 'The ID of the playlist to add videos to',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'videoIds',
      description: 'Video IDs to add to the playlist',
      type: ArgType.String,
      required: true,
      rest: true,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [playlistId, videoIds]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.addVideos(playlistId, videoIds);
      return this.success(true);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
