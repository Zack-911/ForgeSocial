"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetInformationAboutTheUsersCurrentPlayback',
    version: '1.0.0',
    description: 'Get Playback State',
    args: [
        {
            name: 'market',
            description: 'An [ISO 3166-1 alpha-2 country code.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'additional_types',
            description: 'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [market, additionalTypes]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (market != null)
            params.append('market', market.toString());
        if (additionalTypes != null)
            params.append('additional_types', additionalTypes.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/me/player${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetInformationAboutTheUsersCurrentPlayback.js.map