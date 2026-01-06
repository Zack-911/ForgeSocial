import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyCheckCurrentUserFollows',
  version: '1.0.0',
  description: 'Check If User Follows Artists or Users',
  args: [
    {
      name: 'type',
      description: 'The ID type: either `artist` or `user`.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'ids',
      description:
        'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [type, ids]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (type != null) params.append('type', type.toString());
    if (ids != null) params.append('ids', ids.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/me/following/contains${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
