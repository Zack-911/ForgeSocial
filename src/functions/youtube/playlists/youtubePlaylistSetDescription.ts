import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistSetDescription',
  description: 'Set the description of a YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'playlist_id',
      description: 'The ID of the playlist to update',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'description',
      description: 'The new description for the playlist',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [playlistId, description]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.setDescription(playlistId, description);
      return this.success(true);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
