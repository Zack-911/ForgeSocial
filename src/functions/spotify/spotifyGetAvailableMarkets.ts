import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetAvailableMarkets',
  version: '1.0.0',
  description: 'Get Available Markets',
  args: [],
  brackets: false,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, []) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    try {
      const json = await spotifyFetch(`/markets`, token, 'GET');
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
