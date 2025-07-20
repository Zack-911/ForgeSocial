import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { UploadDate, Duration, SortBy, Features } from '../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$searchYoutube',
  version: '1.0.1',
  description:
    'Searches YouTube and returns the top videos in JSON format with execution time. Supports filters.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The search query to look up on YouTube',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'limit',
      description: 'Maximum number of videos to return (default 5, max 25)',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'uploadDate',
      description: 'Upload date filter',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: UploadDate,
    },
    {
      name: 'duration',
      description: 'Video duration filter',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: Duration,
    },
    {
      name: 'sortBy',
      description: 'Sort results by',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: SortBy,
    },
    {
      name: 'features',
      description: 'Features to filter by',
      required: false,
      rest: true,
      type: ArgType.Enum,
      enum: Features,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [query, limit, uploadDate, duration, sortBy, ...features]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const q = query.trim();
    if (!q.length) return this.customError('Query cannot be empty');
    if (!ctx.client.youtube) return this.customError('YouTube API is not configured');

    const filters: Record<string, unknown> = { type: 'video' };

    if (uploadDate) filters.upload_date = uploadDate;
    if (duration) filters.duration = duration;
    if (sortBy) filters.sort_by = sortBy;
    const lim = Math.max(1, Math.min(Number(limit) || 5, 25));

    if (features && features.length)
      filters.features = features.map((f) => String(f).toLowerCase()).filter(Boolean);

    const start = Date.now();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let search: any;
    try {
      search = await ext.youtube?.search(q, filters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return this.customError('YouTube search failed: ' + (e?.message || 'unknown error'));
    }

    const videos = search?.videos || [];
    if (!Array.isArray(videos) || videos.length === 0)
      return this.customError('No videos found for that query');

    const sliced = videos.slice(0, lim);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = sliced.map((v: any) => ({
      id: v.video_id,
      title: v.title?.text,
      description: v.description,
      duration: v.duration?.text,
      durationSeconds: v.duration?.seconds,
      views: v.view_count?.text,
      published: v.published?.text,
      isLive: v.is_live,
      channel: v.author?.name?.text,
      channelId: v.author?.channel_id,
      thumbnail: v.thumbnails,
      animatedThumbnail: v.rich_thumbnail,
      url: `https://youtube.com/watch?v=${v.video_id}`,
    }));
    const ping = Date.now() - start;
    return this.success(
      JSON.stringify(
        {
          success: true,
          ping: ping,
          results: result,
        },
        null,
        2,
      ),
    );
  },
});
