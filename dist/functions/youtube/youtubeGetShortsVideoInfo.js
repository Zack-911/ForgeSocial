'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
const youtubeEnums_1 = require('../../utils/youtubeEnums');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubeGetShortsVideoInfo',
  description: 'Retrieves information about a YouTube Shorts video.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'videoId',
      description: 'The ID of the video to retrieve information for.',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'client',
      description: 'The client to use.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Client,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [videoId, client]) {
    const ext = ctx.getExtension('ForgeSocial');
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }
    try {
      const info = await youtube.getShortsVideoInfo(videoId, client || undefined);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubeGetShortsVideoInfo.js.map
