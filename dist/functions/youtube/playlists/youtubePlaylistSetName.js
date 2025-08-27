"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubePlaylistSetName',
    description: 'Set the name of a YouTube playlist',
    unwrap: true,
    args: [
        {
            name: 'playlistId',
            description: 'The ID of the playlist to rename',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'name',
            description: 'The new name for the playlist',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [playlistId, name]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            await youtube.playlist.setName(playlistId, name);
            return this.success(true);
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubePlaylistSetName.js.map