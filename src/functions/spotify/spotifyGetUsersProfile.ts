import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetUsersProfile',
  version: '1.0.0',
  description: "Get User's Profile",
  args: [
    {
      name: 'user_id',
      description:
        "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).",
      type: ArgType.String,

      required: true,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [userId]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    try {
      const json = await spotifyFetch(`/users/${userId}`, token, 'GET');
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
