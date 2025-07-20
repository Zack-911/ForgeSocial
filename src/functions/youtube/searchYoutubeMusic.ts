import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$searchYoutubeMusic',
  version: '1.3.0',
  description: 'Searches YouTube Music and returns songs in JSON format.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'Search query for music',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'limit',
      description: 'Max number of songs to return (default 5, max 25)',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [query, limit]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const lim = Math.max(1, Math.min(Number(limit) || 5, 25));
    const q = query.trim();
    if (!q) return this.customError('Query cannot be empty');
    if (!ext.youtube?.music) return this.customError('YouTube Music is not available');

    let search;
    try {
      search = await ext.youtube.music.search(q, { type: 'song' });
    } catch (e) {
      return this.customError(
        'YouTube Music search failed: ' + (e instanceof Error ? e.message : String(e)),
      );
    }

    const songs = search?.songs?.contents || [];
    if (!Array.isArray(songs) || songs.length === 0)
      return this.customError('No songs found for that query');

    const sliced = songs.slice(0, lim);
    return this.success(JSON.stringify({ sliced }, null, 2));
  },
});
