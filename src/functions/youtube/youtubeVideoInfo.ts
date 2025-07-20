import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$getYoutubeVideo',
  version: '1.3.0',
  description: 'Returns the youtube videos info.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'ID',
      description: 'The video ID to get info about',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [id]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    let info;
    try {
      info = await ext.youtube?.getInfo(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return this.customError('Failed to fetch video info: ' + (e?.message || 'unknown error'));
    }
    const stats = info?.primary_info;
    const stats2 = info?.secondary_info;
    const secondary = info?.secondary_info;
    const comments = await ext.youtube?.getComments(id);
    const raw = (await comments)?.contents;

    if (!stats) return this.customError('No primary info found for this video');

    const filteredComments = Array.isArray(raw)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        raw.map((item: any) => ({
          content: item?.comment?.content?.text ?? null,
          published_time: item?.comment?.published_time?.text ?? null,
          author_is_channel_owner: item?.comment?.author_is_channel_owner ?? null,
          reply_count: item?.comment?.reply_count ?? null,
          is_member: item?.comment?.author?.is_moderator ?? null,
          author_id: item?.comment?.author?.id ?? null,
          comment_id: item?.comment?.comment_id ?? null,
        }))
      : null;

    return this.success(
      JSON.stringify(
        {
          success: true,
          id: id,
          title: stats?.title?.text ?? null,
          ownerID: stats2?.owner?.author.id,
          ownerName: stats2?.owner?.author.name,
          description: secondary?.description?.text ?? null,
          originalViews: stats?.view_count?.original_view_count ?? null,
          shortViews: stats?.view_count?.extra_short_view_count ?? null,
          totalViews: stats?.view_count?.view_count ?? null,
          playlist: info?.playlist ?? null,
          gameTitle: info?.game_info?.title?.text ?? null,
          merchandise: info?.merchandise ?? null,
          comments: filteredComments,
          url: `https://youtube.com/watch?v=${id}`,
        },
        null,
        2,
      ),
    );
  },
});
