import { NativeFunction, ArgType } from "@tryforge/forgescript";
import { ForgeSocial } from "../../../";
import { handleYoutubeError } from "../../../utils/errorHandler";

export default new NativeFunction({
  name: '$youtubeMusicGetRecap',
  description: 'Retrieves the recap data for YouTube Music',
  unwrap: false,
  output: ArgType.Json,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const info = await youtube.music.getRecap();
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});