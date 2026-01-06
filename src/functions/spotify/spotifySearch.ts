import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';
import { SearchType } from '../../utils/spotifyEnums';

export default new NativeFunction({
  name: '$spotifySearch',
  version: '1.0.0',
  description: 'Search for Item',
  args: [
    {
      name: 'q',
      description: 'Your search query.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'type',
      description:
        'A comma-separated list of item types to search across. Search results include hits',
      type: ArgType.Enum,
      enum: SearchType,
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
      description: 'The maximum number of results to return in each item type.',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
    {
      name: 'offset',
      description: 'The index of the first result to return. Use',
      type: ArgType.Number,

      required: false,
      rest: false,
    },
    {
      name: 'include_external',
      description:
        'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks',
      type: ArgType.String,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [q, type, market, limit, offset, includeExternal]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (q != null) params.append('q', q.toString());
    if (type != null) params.append('type', type.toString());
    if (market != null) params.append('market', market.toString());
    if (limit != null) params.append('limit', limit.toString());
    if (offset != null) params.append('offset', offset.toString());
    if (includeExternal != null) params.append('include_external', includeExternal.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/search${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
