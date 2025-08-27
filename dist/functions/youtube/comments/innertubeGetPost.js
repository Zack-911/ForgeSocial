"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeGetPost',
    description: 'Get a YouTube community post by ID',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'postId',
            description: 'The ID of the community post to retrieve',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'channelId',
            description: 'The ID of the channel that owns the post',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [postId, channelId]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            const post = await youtube.getPost(postId, channelId);
            return this.success(JSON.stringify(post, null, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=innertubeGetPost.js.map