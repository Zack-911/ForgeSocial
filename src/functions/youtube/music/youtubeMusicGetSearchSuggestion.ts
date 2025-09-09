import { NativeFunction, ArgType } from "@tryforge/forgescript";
import { ForgeSocial } from "../../../";
import { handleYoutubeError } from "../../../utils/errorHandler";

export default new NativeFunction({
  name: '$youtubeMusicGetSearchSuggestions',
  description: 'Retrieves the search suggestion data for YouTube Music',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The query to get search suggestions for',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [query]) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const info = await youtube.music.getSearchSuggestions(query);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});