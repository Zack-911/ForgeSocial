"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
const spotifyEnums_1 = require("../../utils/spotifyEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetUsersTopArtistsAndTracks',
    version: '1.0.0',
    description: "Get User's Top Items",
    args: [
        {
            name: 'type',
            description: 'The type of entity to return. Valid values: `artists` or `tracks`',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'time_range',
            description: 'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`',
            type: forgescript_1.ArgType.Enum,
            enum: spotifyEnums_1.TimeRange,
            required: false,
            rest: false,
        },
        {
            name: 'limit',
            description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'offset',
            description: 'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [type, timeRange, limit, offset]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (timeRange != null)
            params.append('time_range', timeRange.toString());
        if (limit != null)
            params.append('limit', limit.toString());
        if (offset != null)
            params.append('offset', offset.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/me/top/${type}${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetUsersTopArtistsAndTracks.js.map