'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubeGetSearchSuggestions',
  description: 'Gets search suggestions.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The query to get search suggestions for.',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'previousQuery',
      description: 'The previous query to get search suggestions for.',
      type: forgescript_1.ArgType.String,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [query, previousQuery]) {
    const ext = ctx.getExtension('ForgeSocial');
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }
    try {
      const info = await youtube.getSearchSuggestions(query, previousQuery || undefined);
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubeGetSearchSuggestions.js.map
