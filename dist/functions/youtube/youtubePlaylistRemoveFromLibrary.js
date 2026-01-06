'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubePlaylistRemoveFromLibrary',
  description: 'Remove a playlist from the library',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'playlistId',
      description: 'The ID of the playlist to remove from library',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: forgescript_1.ArgType.Boolean,
  async execute(ctx, [playlistId]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.removeFromLibrary(playlistId);
      return this.success(true);
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubePlaylistRemoveFromLibrary.js.map
