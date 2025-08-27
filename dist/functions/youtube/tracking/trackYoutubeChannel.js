"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const pollYoutube_1 = require("../../../natives/pollYoutube");
exports.default = new forgescript_1.NativeFunction({
    name: '$trackYoutubeChannel',
    description: 'Starts tracking a YouTube channel and emits events on new uploads.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'channelId',
            description: 'The channel ID to track (e.g. UC_x5XG1OV2P6uZZ5FSM9Ttw)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [channelId]) {
        await (0, pollYoutube_1.trackNewVideos)(channelId);
        return this.success(true);
    },
});
//# sourceMappingURL=trackYoutubeChannel.js.map