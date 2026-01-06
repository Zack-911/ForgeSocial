import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';
import { TimeRange } from '../../utils/spotifyEnums';

export default new NativeFunction({
  name: '$spotifyGetUsersTopArtistsAndTracks',
  version: '1.0.0',
  description: "Get User's Top Items",
  args: [
    {
      name: 'type',
      description: 'The type of entity to return. Valid values: `artists` or `tracks`',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'time_range',
      description:
        'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`',
      type: ArgType.Enum,
      enum: TimeRange,
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

  async execute(ctx, [type, timeRange, limit, offset]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (timeRange != null) params.append('time_range', timeRange.toString());
    if (limit != null) params.append('limit', limit.toString());
    if (offset != null) params.append('offset', offset.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/me/top/${type}${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
