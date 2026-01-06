import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetHashtag',
  description: 'Get a YouTube hashtag page',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'hashtag',
      description: 'The hashtag to search for (without #)',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [hashtag]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const data = await youtube.getHashtag(hashtag);
      return this.success(JSON.stringify(data, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
