import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetMultipleAlbums',
  version: '1.0.0',
  description: 'Get Several Albums',
  args: [
    {
      name: 'ids',
      description: 'A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'market',
      description: 'An ISO 3166-1 alpha-2 country code.',
      type: ArgType.String,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [ids, market]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (ids != null) params.append('ids', ids.toString());
    if (market != null) params.append('market', market.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/albums${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
