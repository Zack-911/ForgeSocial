import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistSetName',
  description: 'Set the name of a YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'playlistId',
      description: 'The ID of the playlist to rename',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'name',
      description: 'The new name for the playlist',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [playlistId, name]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.setName(playlistId, name);
      return this.success(true);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
