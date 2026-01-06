'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const errorHandler_1 = require('../../utils/errorHandler');
const youtubeEnums_1 = require('../../utils/youtubeEnums');
exports.default = new forgescript_1.NativeFunction({
  name: '$youtubeSearch',
  description: 'Searches YouTube.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The query to search for.',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'uploadDate',
      description: 'The upload date to filter by.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.UploadDate,
      required: false,
      rest: false,
    },
    {
      name: 'duration',
      description: 'The duration to filter by.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Duration,
      required: false,
      rest: false,
    },
    {
      name: 'type',
      description: 'The type to filter by.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.SearchType,
      required: false,
      rest: false,
    },
    {
      name: 'sortBy',
      description: 'The sort by to filter by.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.SortBy,
      required: false,
      rest: false,
    },
    {
      name: 'features',
      description: 'The features to filter by.',
      type: forgescript_1.ArgType.Enum,
      enum: youtubeEnums_1.Features,
      required: false,
      rest: true,
    },
  ],
  async execute(ctx, [query, uploadDate, duration, type, sortBy, features]) {
    const ext = ctx.getExtension('ForgeSocial');
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }
    try {
      const info = await youtube.search(query, {
        upload_date: uploadDate || undefined,
        duration: duration || undefined,
        type: type || undefined,
        sort_by: sortBy || undefined,
        features: features || undefined,
      });
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success((0, errorHandler_1.handleYoutubeError)(error));
    }
  },
});
//# sourceMappingURL=youtubeSearch.js.map
