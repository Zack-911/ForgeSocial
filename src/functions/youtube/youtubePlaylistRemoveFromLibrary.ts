import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistRemoveFromLibrary',
  description: 'Remove a playlist from the library',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'playlistId',
      description: 'The ID of the playlist to remove from library',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [playlistId]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.removeFromLibrary(playlistId);
      return this.success(true);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
