"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyCheckIfUserFollowsPlaylist',
    version: '1.0.0',
    description: 'Check if Current User Follows Playlist',
    args: [
        {
            name: 'playlist_id',
            description: 'The Spotify ID of the playlist.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'ids',
            description: "**Deprecated** A single item list containing current user's Spotify Username. Maximum: 1 id.",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [playlistId, ids]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (ids != null)
            params.append('ids', ids.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/playlists/${playlistId}/followers/contains${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyCheckIfUserFollowsPlaylist.js.map