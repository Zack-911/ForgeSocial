import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistCreate',
  description: 'Create a new YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'title',
      description: 'The title of the new playlist',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'videoIds',
      description: 'video IDs to add to the playlist',
      type: ArgType.String,
      required: false,
      rest: true,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [title, videoIds]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const playlist = await youtube.playlist.create(title, videoIds);
      return this.success(JSON.stringify(playlist, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
