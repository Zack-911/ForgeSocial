"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const spotifyFetch_1 = require("../../utils/spotifyFetch");
exports.default = new forgescript_1.NativeFunction({
    name: '$spotifyGetRecommendationGenres',
    version: '1.0.0',
    description: 'Get Available Genre Seeds',
    args: [],
    brackets: false,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    async execute(ctx, []) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const token = await ext?.getSpotifyAccessToken();
        if (!token)
            return this.customError('No Spotify access token found.');
        try {
            const json = await (0, spotifyFetch_1.spotifyFetch)(`/recommendations/available-genre-seeds`, token, 'GET');
            return this.success(JSON.stringify(json, null, 2));
        }
        catch (e) {
            return this.customError(e.message);
        }
    },
});
//# sourceMappingURL=spotifyGetRecommendationGenres.js.map