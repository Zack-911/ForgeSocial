import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { SortBy } from '../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$searchYoutubeChannel',
  version: '1.3.0',
  description: 'Searches YouTube and returns matching channels in JSON format.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'Search query for YouTube channels',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'limit',
      description: 'Maximum number of channels to return (default 5, max 25)',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'sortBy',
      description: 'Sort results by (optional)',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: SortBy,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [query, limit, sortBy]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const lim = Math.max(1, Math.min(Number(limit) || 5, 25));
    const filters: Record<string, unknown> = { type: 'channel' };
    if (sortBy) filters.sort_by = sortBy;

    let search;
    try {
      search = await ext.youtube?.search(query, filters);
    } catch (e) {
      return this.customError(
        'YouTube channel search failed: ' + (e instanceof Error ? e.message : String(e)),
      );
    }

    const channels = search?.channels || [];
    if (!Array.isArray(channels) || channels.length === 0) {
      return this.customError('No channels found for that query.');
    }

    const sliced = channels.slice(0, lim);
    return this.success(JSON.stringify({ sliced }, null, 2));
  },
});
