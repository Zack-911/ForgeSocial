import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetChannel',
  description: 'Get a YouTube channel by ID',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'id',
      description: 'The ID of the channel to get',
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
      const data = await youtube.getChannel(id);
      return this.success(JSON.stringify(data, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
