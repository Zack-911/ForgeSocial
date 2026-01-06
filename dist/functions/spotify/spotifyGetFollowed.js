"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetFollowed',
    version: '1.0.0',
    description: 'Get Followed Artists',
    args: [
        {
            name: 'type',
            description: 'The ID type: currently only `artist` is supported.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'after',
            description: 'The last artist ID retrieved from the previous request.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'limit',
            description: 'The maximum number of items to return. Default: 20\. Minimum: 1\. Maximum: 50\.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [type, after, limit]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (type != null)
            params.append('type', type.toString());
        if (after != null)
            params.append('after', after.toString());
        if (limit != null)
            params.append('limit', limit.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/me/following${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetFollowed.js.map