import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

enum CommentsSortBy {
  NewestFirst = 'NEWEST_FIRST',
  TopComments = 'TOP_COMMENTS',
}

export default new NativeFunction({
  name: '$youtubeGetPostComments',
  description: 'Get comments for a YouTube community post',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'postId',
      description: 'The ID of the community post',
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
    {
      name: 'sortBy',
      description: 'Sort order of comments (TOP_COMMENTS, NEWEST_FIRST)',
      type: ArgType.Enum,
      enum: CommentsSortBy,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [postId, channelId, sortBy]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');

      const comments = await youtube.getPostComments(postId, channelId, sortBy || undefined);

      return this.success(JSON.stringify(comments, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
