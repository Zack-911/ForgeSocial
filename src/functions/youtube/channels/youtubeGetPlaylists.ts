import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetPlaylists',
  description: 'Get YouTube playlists',
  unwrap: false,
  output: ArgType.Json,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const playlists = await youtube.getPlaylists();
      return this.success(JSON.stringify(playlists, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
