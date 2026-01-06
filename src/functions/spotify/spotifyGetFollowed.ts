import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetFollowed',
  version: '1.0.0',
  description: 'Get Followed Artists',
  args: [
    {
      name: 'type',
      description: 'The ID type: currently only `artist` is supported.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'after',
      description: 'The last artist ID retrieved from the previous request.',
      type: ArgType.String,

      required: false,
      rest: false,
    },
    {
      name: 'limit',
      description:
        'The maximum number of items to return. Default: 20\. Minimum: 1\. Maximum: 50\.',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [type, after, limit]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (type != null) params.append('type', type.toString());
    if (after != null) params.append('after', after.toString());
    if (limit != null) params.append('limit', limit.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/me/following${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
