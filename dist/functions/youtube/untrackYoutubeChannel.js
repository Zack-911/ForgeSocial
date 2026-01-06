"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const pollYoutube_1 = require("../../natives/pollYoutube");
exports.default = new forgescript_1.NativeFunction({
    name: '$unTrackYoutubeChannel',
    description: 'Stops tracking a previously tracked YouTube channel.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'channelId',
            description: 'The channel ID to untrack.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [channelId]) {
        const removed = await (0, pollYoutube_1.removeChannel)(channelId);
        return this.success(removed ? `true` : `false`);
    },
});
//# sourceMappingURL=untrackYoutubeChannel.js.map