"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeGetUnseenNotificationsCount',
    description: 'Get the count of unseen YouTube notifications',
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    async execute(ctx) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const youtube = ext.youtube;
            if (!youtube)
                return this.customError('YouTube not configured or not found');
            const count = await youtube.getUnseenNotificationsCount();
            return this.success(count);
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleYoutubeError)(error));
        }
    },
});
//# sourceMappingURL=youtubeGetUnseenNotificationsCount.js.map