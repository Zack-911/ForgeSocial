"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeMusicGetPlaylist',
    description: 'Get the playlist of YouTube music',
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Json,
    args: [
        {
            name: 'id',
            description: 'The ID of the playlist to get information about',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [id]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            const info = await youtube.music.getPlaylist(id);
            return this.success(JSON.stringify(info, null, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubeMusicGetPlaylist.js.map