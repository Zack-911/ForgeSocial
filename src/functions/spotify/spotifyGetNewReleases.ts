import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetNewReleases',
  version: '1.0.0',
  description: 'Get New Releases',
  args: [
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

  async execute(ctx, [limit, offset]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (limit != null) params.append('limit', limit.toString());
    if (offset != null) params.append('offset', offset.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/browse/new-releases${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
