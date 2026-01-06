import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetRecentlyPlayed',
  version: '1.0.0',
  description: 'Get Recently Played Tracks',
  args: [
    {
      name: 'limit',
      description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
    {
      name: 'after',
      description: 'A Unix timestamp in milliseconds. Returns all items',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
    {
      name: 'before',
      description: 'A Unix timestamp in milliseconds. Returns all items',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [limit, after, before]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (limit != null) params.append('limit', limit.toString());
    if (after != null) params.append('after', after.toString());
    if (before != null) params.append('before', before.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/me/player/recently-played${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
