"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
var CommentsSortBy;
(function (CommentsSortBy) {
    CommentsSortBy["NewestFirst"] = "NEWEST_FIRST";
    CommentsSortBy["TopComments"] = "TOP_COMMENTS";
})(CommentsSortBy || (CommentsSortBy = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeGetComments',
    description: 'Get comments for a YouTube video',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'videoId',
            description: 'The ID of the video to get comments from',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'sortBy',
            description: 'Sort order of comments (TOP_COMMENTS, NEWEST_FIRST)',
            type: forgescript_1.ArgType.Enum,
            enum: CommentsSortBy,
            required: false,
            rest: false,
        },
        {
            name: 'commentId',
            description: 'The ID of a specific comment to get replies for',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [videoId, sortBy, commentId]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            const comments = await youtube.getComments(videoId, sortBy ?? undefined, commentId || undefined);
            return this.success(JSON.stringify(comments, null, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=innertubeGetComments.js.map