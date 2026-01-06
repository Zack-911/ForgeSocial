import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetACategory',
  version: '1.0.0',
  description: 'Get Single Browse Category',
  args: [
    {
      name: 'category_id',
      description:
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.',
      type: ArgType.String,

      required: true,
      rest: false,
    },
    {
      name: 'locale',
      description:
        'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._',
      type: ArgType.String,

      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [categoryId, locale]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (locale != null) params.append('locale', locale.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/browse/categories/${categoryId}${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
