import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistMoveVideo',
  description: 'Move a video within a YouTube playlist',
  unwrap: true,
  args: [
    {
      name: 'playlistId',
      description: 'The ID of the playlist containing the video',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'movedVideoId',
      description: 'The ID of the video to move',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'predecessorVideoId',
      description: 'The ID of the video that will be before the moved video (empty for start)',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [playlistId, movedVideoId, predecessorVideoId]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.moveVideo(playlistId, movedVideoId, predecessorVideoId);
      return this.success(true);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
