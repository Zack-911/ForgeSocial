import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeMusicGetUpNext',
  description: 'Get the up next of YouTube music',
  brackets: true,
  unwrap: true,
  output: ArgType.Json,
  args: [
    {
      name: 'id',
      description: 'The ID of the up next to get information about',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'automix',
      description: 'YEA BABY!!!!!!!! AUTOMIX!!!!!!!!',
      type: ArgType.Boolean,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [id, automix]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const info = await youtube.music.getUpNext(id, automix || undefined);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});