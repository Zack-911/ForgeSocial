"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtubeEnums_1 = require("../../utils/youtubeEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$searchYoutubeChannel',
    version: '1.3.0',
    description: 'Searches YouTube and returns matching channels in JSON format.',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'query',
            description: 'Search query for YouTube channels',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'limit',
            description: 'Maximum number of channels to return (default 5, max 25)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'sortBy',
            description: 'Sort results by (optional)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.SortBy,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [query, limit, sortBy]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const lim = Math.max(1, Math.min(Number(limit) || 5, 25));
        const filters = { type: 'channel' };
        if (sortBy)
            filters.sort_by = sortBy;
        let search;
        try {
            search = await ext.youtube?.search(query, filters);
        }
        catch (e) {
            return this.customError('YouTube channel search failed: ' + (e instanceof Error ? e.message : String(e)));
        }
        const channels = search?.channels || [];
        if (!Array.isArray(channels) || channels.length === 0) {
            return this.customError('No channels found for that query.');
        }
        const sliced = channels.slice(0, lim);
        return this.success(JSON.stringify({ sliced }, null, 2));
    },
});
//# sourceMappingURL=searchYoutubeChannel.js.map