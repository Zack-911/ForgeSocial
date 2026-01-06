'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const pollYoutube_1 = require('../../natives/pollYoutube');
exports.default = new forgescript_1.NativeFunction({
  name: '$listTrackedYoutubeChannels',
  description: 'Returns a list of all tracked YouTube channel IDs.',
  version: '1.0.0',
  unwrap: false,
  async execute() {
    const channels = (0, pollYoutube_1.getAllTrackedChannels)();
    return this.success(channels);
  },
});
//# sourceMappingURL=listTrackedYoutubeChannels.js.map
