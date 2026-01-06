"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetPlaylist',
    version: '1.0.0',
    description: 'Get Playlist',
    args: [
        {
            name: 'playlist_id',
            description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.',
            type: forgescript_1.ArgType.String,
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
            name: 'fields',
            description: 'Filters for the query: a comma-separated list of the',
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
    async execute(ctx, [playlistId, market, fields, additionalTypes]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        const params = new URLSearchParams();
        if (market != null)
            params.append('market', market.toString());
        if (fields != null)
            params.append('fields', fields.toString());
        if (additionalTypes != null)
            params.append('additional_types', additionalTypes.toString());
        const queryString = params.toString();
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/playlists/${playlistId}${queryString ? '?' + queryString : ''}`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetPlaylist.js.map