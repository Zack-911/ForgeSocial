import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetSearchSuggestions',
  description: 'Gets search suggestions.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The query to get search suggestions for.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'previousQuery',
      description: 'The previous query to get search suggestions for.',
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [query, previousQuery]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }

    try {
      const info = await youtube.getSearchSuggestions(query, previousQuery || undefined);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
