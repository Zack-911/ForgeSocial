"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeGetInfo',
    description: 'Retrieves information about a YouTube video.',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'videoId',
            description: 'The ID of the video to retrieve information for.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [videoId]) {
        const ext = ctx.getExtension('ForgeSocial');
        const youtube = ext.youtube;
        if (!youtube) {
            return this.customError('YouTube not configured not found');
        }
        try {
            const info = await youtube.getInfo(videoId);
            return this.success(JSON.stringify(info, null, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubeGetInfo.js.map