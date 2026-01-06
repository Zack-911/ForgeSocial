import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyCheckIfUserFollowsPlaylist',
  version: '1.0.0',
  description: 'Check if Current User Follows Playlist',
  args: [
    {
      name: 'playlist_id',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'ids',
      description:
        "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.",
      type: ArgType.String,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [playlistId, ids]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (ids != null) params.append('ids', ids.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/playlists/${playlistId}/followers/contains${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
