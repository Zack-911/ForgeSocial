import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetHomeFeed',
  description: 'Get the home feed of YouTube',
  unwrap: false,
  output: ArgType.Json,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const data = await youtube.getHomeFeed();
      return this.success(JSON.stringify(data, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
