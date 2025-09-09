"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubePlaylistUpload',
    description: 'upload a YouTube playlist',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'title',
            description: 'The title of the playlist',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'id',
            description: 'The ID of the playlist to get',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [title, id]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            const info = await youtube.playlist.create(title, id);
            return this.success(JSON.stringify(info, null, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubePlaylistUpload.js.map