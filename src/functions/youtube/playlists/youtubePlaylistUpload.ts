import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubePlaylistUpload',
  description: 'upload a YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'title',
      description: 'The title of the playlist',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'id',
      description: 'The ID of the playlist to get',
      type: ArgType.String,
      required: true,
      rest: true,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [title, id]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const info = await youtube.playlist.create(title, id);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
