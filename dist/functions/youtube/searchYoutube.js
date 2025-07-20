"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtubeEnums_1 = require("../../utils/youtubeEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$searchYoutube',
    version: '1.3.0',
    description: 'Searches YouTube and returns the top videos in JSON format. Supports filters.',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'query',
            description: 'The search query to look up on YouTube',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'limit',
            description: 'Maximum number of videos to return (default 5, max 25)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'uploadDate',
            description: 'Upload date filter',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.UploadDate,
        },
        {
            name: 'duration',
            description: 'Video duration filter',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.Duration,
        },
        {
            name: 'sortBy',
            description: 'Sort results by',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.SortBy,
        },
        {
            name: 'features',
            description: 'Features to filter by',
            required: false,
            rest: true,
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.Features,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [query, limit, uploadDate, duration, sortBy, ...features]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const filters = { type: 'video' };
        if (uploadDate)
            filters.upload_date = uploadDate;
        if (duration)
            filters.duration = duration;
        if (sortBy)
            filters.sort_by = sortBy;
        if (features && features.length)
            filters.features = features.map((f) => String(f).toLowerCase()).filter(Boolean);
        const lim = Math.max(1, Math.min(Number(limit) || 5, 25));
        let search;
        try {
            search = await ext.youtube?.search(query, filters);
        }
        catch (e) {
            this.customError('YouTube search failed: ' + (e || 'unknown error'));
        }
        const videos = search?.videos || [];
        if (!videos) {
            return this.customError('Unable to find any videos using the query. Try removing some filters');
        }
        const sliced = Array.isArray(videos) ? videos.slice(0, lim) : videos;
        return this.success(JSON.stringify(sliced, undefined, 2));
    },
});
//# sourceMappingURL=searchYoutube.js.map