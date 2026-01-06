'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubeGetHomeFeed',
  description: 'Get the home feed of YouTube',
  unwrap: false,
  output: forgescript_1.ArgType.Json,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial');
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const data = await youtube.getHomeFeed();
      return this.success(JSON.stringify(data, null, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubeGetHomeFeed.js.map
