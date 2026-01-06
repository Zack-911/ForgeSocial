import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetAnArtistsTopTracks',
  version: '1.0.0',
  description: "Get Artist's Top Tracks",
  args: [
    {
      name: 'id',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.',
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
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [id, market]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (market != null) params.append('market', market.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/artists/${id}/top-tracks${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
