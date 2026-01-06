import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { spotifyFetch } from '../../utils/spotifyFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$spotifyGetCategories',
  version: '1.0.0',
  description: 'Get Several Browse Categories',
  args: [
    {
      name: 'locale',
      description:
        'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._',
      type: ArgType.String,

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

  async execute(ctx, [locale, limit, offset]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const token = await ext?.getSpotifyAccessToken();
    if (!token) return this.customError('No Spotify access token found.');

    const params = new URLSearchParams();
    if (locale != null) params.append('locale', locale.toString());
    if (limit != null) params.append('limit', limit.toString());
    if (offset != null) params.append('offset', offset.toString());
    const queryString = params.toString();
    try {
      const json = await spotifyFetch(
        `/browse/categories${queryString ? '?' + queryString : ''}`,
        token,
        'GET',
      );
      return this.success(JSON.stringify(json, null, 2));
    } catch (e) {
      return this.customError((e as Error).message);
    }
  },
});
