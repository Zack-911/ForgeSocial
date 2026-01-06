'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubePlaylistCreate',
  description: 'Create a new YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'title',
      description: 'The title of the new playlist',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'videoIds',
      description: 'video IDs to add to the playlist',
      type: forgescript_1.ArgType.String,
      required: false,
      rest: true,
    },
  ],
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [title, videoIds]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const playlist = await youtube.playlist.create(title, videoIds);
      return this.success(JSON.stringify(playlist, null, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubePlaylistCreate.js.map
