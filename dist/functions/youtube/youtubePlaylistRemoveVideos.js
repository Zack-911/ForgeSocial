"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubePlaylistRemoveVideos',
    description: 'Remove videos from a YouTube playlist',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'playlistId',
            description: 'The ID of the playlist to remove videos from',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'useSetVideoIds',
            description: 'Whether to use set video IDs (true) or playlist item IDs (false)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
            default: false,
        },
        {
            name: 'videoIds',
            description: 'Comma-separated list of video IDs to remove from the playlist',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [playlistId, useSetVideoIds, videoIds]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            await youtube.playlist.removeVideos(playlistId, videoIds, useSetVideoIds || undefined);
            return this.success(true);
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubePlaylistRemoveVideos.js.map