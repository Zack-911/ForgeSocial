import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { UploadDate, Duration, SortBy, Features } from '../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$searchYoutube',
  version: '1.3.0',
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
    const filters: Record<string, unknown> = { type: 'video' };
    if (uploadDate) filters.upload_date = uploadDate;
    if (duration) filters.duration = duration;
    if (sortBy) filters.sort_by = sortBy;
    if (features && features.length)
      filters.features = features.map((f) => String(f).toLowerCase()).filter(Boolean);
    const lim = Math.max(1, Math.min(Number(limit) || 5, 25));
    let search;
    try {
      search = await ext.youtube?.search(query, filters);
    } catch (e) {
      this.customError('YouTube search failed: ' + (e || 'unknown error'));
    }
    const videos = search?.videos || [];
    if (!videos) {
      return this.customError(
        'Unable to find any videos using the query. Try removing some filters',
      );
    }
    const sliced = Array.isArray(videos) ? videos.slice(0, lim) : videos;
    return this.success(JSON.stringify(sliced, undefined, 2));
  },
});
