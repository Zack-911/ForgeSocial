import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetPost',
  description: 'Get a YouTube community post by ID',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'postId',
      description: 'The ID of the community post to retrieve',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'channelId',
      description: 'The ID of the channel that owns the post',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [postId, channelId]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');

      const post = await youtube.getPost(postId, channelId);
      return this.success(JSON.stringify(post, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
