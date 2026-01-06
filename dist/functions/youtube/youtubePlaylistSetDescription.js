'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubePlaylistSetDescription',
  description: 'Set the description of a YouTube playlist',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'playlist_id',
      description: 'The ID of the playlist to update',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'description',
      description: 'The new description for the playlist',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
  ],
  output: forgescript_1.ArgType.Boolean,
  async execute(ctx, [playlistId, description]) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      await youtube.playlist.setDescription(playlistId, description);
      return this.success(true);
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubePlaylistSetDescription.js.map
