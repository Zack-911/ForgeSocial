import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetPlaylist',
  description: 'Get a YouTube playlist by ID',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'id',
      description: 'The ID of the playlist to get',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [id]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const playlist = await youtube.getPlaylist(id);
      return this.success(JSON.stringify(playlist, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
