import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetAShow',
  version: '1.0.0',
  description: 'Get Show',
  args: [
    {
      name: 'market',
      description:
        'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).',
      type: ArgType.String,

      required: false,
      rest: false,
    },
    {
      name: 'id',
      description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)',
      type: ArgType.String,

      required: true,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [market, id]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (market != null) params.append('market', market.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/shows/${id}${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
