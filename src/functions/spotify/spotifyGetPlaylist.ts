import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetPlaylist',
  version: '1.0.0',
  description: 'Get Playlist',
  args: [
    {
      name: 'playlist_id',
      description: 'The Spotify ID of the playlist.',
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
    {
      name: 'fields',
      description: 'Filters for the query: a comma-separated list of the',
      type: ArgType.String,

      required: false,
      rest: false,
    },
    {
      name: 'additional_types',
      description:
        'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>',
      type: ArgType.String,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [playlistId, market, fields, additionalTypes]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (market != null) params.append('market', market.toString());
    if (fields != null) params.append('fields', fields.toString());
    if (additionalTypes != null) params.append('additional_types', additionalTypes.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/playlists/${playlistId}${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
