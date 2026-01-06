"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
const spotifyEnums_1 = require("../../utils/spotifyEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetAnArtistsAlbums',
    version: '1.0.0',
    description: "Get Artist's Albums",
    args: [
        {
            name: 'id',
            description: 'The Spotify ID of the artist.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'include_groups',
            description: 'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>',
            type: forgescript_1.ArgType.Enum,
            enum: spotifyEnums_1.IncludeGroups,
            required: false,
            rest: false,
        },
        {
            name: 'market',
            description: 'An ISO 3166-1 alpha-2 country code.',
            type: forgescript_1.ArgType.String,
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
    async execute(ctx, [id, includeGroups, market, limit, offset]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (includeGroups != null)
            params.append('include_groups', includeGroups.toString());
        if (market != null)
            params.append('market', market.toString());
        if (limit != null)
            params.append('limit', limit.toString());
        if (offset != null)
            params.append('offset', offset.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/artists/${id}/albums${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetAnArtistsAlbums.js.map