import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$getChannelInfo',
  version: '1.0.0',
  description: 'Gets info about a YouTube channel by ID or handle.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'identifier',
      description: 'Channel ID or handle (e.g. UC... or @username)',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [id]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const query = String(id || '').trim();

    try {
      const result = await ext.youtube?.getChannel(query);
      return this.success(
        JSON.stringify(
          {
            title: result?.metadata.title,
            description: result?.metadata.description,
            thumbnail: result?.metadata.thumbnail,
            avatar: result?.metadata.avatar,
            isFamilySafe: result?.metadata.is_family_safe,
            availableCountries: result?.metadata.available_countries,
            keywords: result?.metadata.keywords,
            url: result?.metadata.url,
            rssUrl: result?.metadata.rss_url,
          },
          null,
          2,
        ),
      );
    } catch (e) {
      return this.customError('Failed to get channel info: ' + (e as Error).message);
    }
  },
});
