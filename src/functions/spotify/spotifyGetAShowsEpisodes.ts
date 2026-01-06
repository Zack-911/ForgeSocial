import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetAShowsEpisodes',
  version: '1.0.0',
  description: 'Get Show Episodes',
  args: [
    {
      name: 'id',
      description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'market',
      description:
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).',
      type: ArgType.String,

      required: false,
      rest: false,
    },
    {
      name: 'limit',
      description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
    {
      name: 'offset',
      description:
        'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [id, market, limit, offset]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (market != null) params.append('market', market.toString());
    if (limit != null) params.append('limit', limit.toString());
    if (offset != null) params.append('offset', offset.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/shows/${id}/episodes${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
