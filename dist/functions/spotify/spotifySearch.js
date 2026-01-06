"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
const spotifyEnums_1 = require("../../utils/spotifyEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifySearch',
    version: '1.0.0',
    description: 'Search for Item',
    args: [
        {
            name: 'q',
            description: 'Your search query.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'type',
            description: 'A comma-separated list of item types to search across. Search results include hits',
            type: forgescript_1.ArgType.Enum,
            enum: spotifyEnums_1.SearchType,
            required: true,
            rest: false,
        },
        {
            name: 'market',
            description: 'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'limit',
            description: 'The maximum number of results to return in each item type.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'offset',
            description: 'The index of the first result to return. Use',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'include_external',
            description: 'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [q, type, market, limit, offset, includeExternal]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (q != null)
            params.append('q', q.toString());
        if (type != null)
            params.append('type', type.toString());
        if (market != null)
            params.append('market', market.toString());
        if (limit != null)
            params.append('limit', limit.toString());
        if (offset != null)
            params.append('offset', offset.toString());
        if (includeExternal != null)
            params.append('include_external', includeExternal.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/search${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifySearch.js.map