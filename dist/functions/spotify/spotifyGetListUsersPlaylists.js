"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetListUsersPlaylists',
    version: '1.0.0',
    description: "Get User's Playlists",
    args: [
        {
            name: 'user_id',
            description: "The user's Spotify user ID.",
            type: forgescript_1.ArgType.String,
            required: true,
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
            description: 'The index of the first playlist to return. Default:',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [userId, limit, offset]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (limit != null)
            params.append('limit', limit.toString());
        if (offset != null)
            params.append('offset', offset.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/users/${userId}/playlists${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetListUsersPlaylists.js.map