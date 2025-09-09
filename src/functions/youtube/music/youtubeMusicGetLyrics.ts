import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeMusicGetLyrics',
  description: 'Get the lyrics of YouTube music',
  brackets: true,
  unwrap: true,
  experimental: true,
  output: ArgType.Json,
  args: [
    {
      name: 'id',
      description: 'The ID of the lyrics to get information about',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [id]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const info = await youtube.music.getLyrics(id);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});