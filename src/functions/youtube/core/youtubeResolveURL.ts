import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeResolveURL',
  description: 'Resolves a URL.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'url',
      description: 'The URL to resolve.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [url]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }

    try {
      const info = await youtube.resolveURL(url);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
