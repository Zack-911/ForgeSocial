"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
const youtubeEnums_1 = require("../../../utils/youtubeEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeGetStreamingData',
    description: 'Gets streaming data.',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'video_id',
            description: 'The video ID to get streaming data for.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'itag',
            description: 'Theitag to get streaming data for.',
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.Itag,
            required: false,
            rest: false,
        },
        {
            name: 'quality',
            description: 'The quality to get streaming data for.',
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.Quality,
            required: false,
            rest: false,
        },
        {
            name: 'type',
            description: 'The type to get streaming data for.',
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.Type,
            required: false,
            rest: false,
        },
        {
            name: 'language',
            description: 'The language to get streaming data for.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'format',
            description: 'The format to get streaming data for.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'codec',
            description: 'Video or audio codec identifier for the stream',
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.Codec,
            required: false,
            rest: false,
        },
    ],
    async execute(ctx, [video_id, itag, quality, type, language, format, codec]) {
        const ext = ctx.getExtension('ForgeSocial');
        const youtube = ext.youtube;
        if (!youtube) {
            return this.customError('YouTube not configured not found');
        }
        try {
            const info = await youtube.getStreamingData(video_id, {
                itag: itag || undefined,
                quality: quality || youtubeEnums_1.Quality.BestEfficiency,
                type: type || undefined,
                language: language || 'original',
                format: format || 'any',
                codec: codec || undefined,
            });
            return this.success(JSON.stringify(info, null, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubeGetStreamingData.js.map