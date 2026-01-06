import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyCheckUsersSavedAlbums',
  version: '1.0.0',
  description: "Check User's Saved Albums",
  args: [
    {
      name: 'ids',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [ids]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (ids != null) params.append('ids', ids.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/me/albums/contains${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
