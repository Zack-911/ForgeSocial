'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubePlaylistAddVideos',
  description: 'Add videos to a YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'playlistId',
      description: 'The ID of the playlist to add videos to',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'videoIds',
      description: 'Video IDs to add to the playlist',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: true,
    },
  ],
  output: forgescript_1.ArgType.Boolean,
  async execute(ctx, [playlistId, videoIds]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.addVideos(playlistId, videoIds);
      return this.success(true);
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubePlaylistAddVideos.js.map
