"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubePlaylistMoveVideo',
    description: 'Move a video within a YouTube playlist',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'playlistId',
            description: 'The ID of the playlist containing the video',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'movedVideoId',
            description: 'The ID of the video to move',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'predecessorVideoId',
            description: 'The ID of the video that will be before the moved video (empty for start)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [playlistId, movedVideoId, predecessorVideoId]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            await youtube.playlist.moveVideo(playlistId, movedVideoId, predecessorVideoId);
            return this.success(true);
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubePlaylistMoveVideo.js.map