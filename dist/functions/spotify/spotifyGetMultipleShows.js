"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetMultipleShows',
    version: '1.0.0',
    description: 'Get Several Shows',
    args: [
        {
            name: 'market',
            description: 'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'ids',
            description: 'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [market, ids]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (market != null)
            params.append('market', market.toString());
        if (ids != null)
            params.append('ids', ids.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/shows${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetMultipleShows.js.map