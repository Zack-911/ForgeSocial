'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const pollSubreddit_1 = require('../../natives/pollSubreddit');
exports.default = new forgescript_1.NativeFunction({
  name: '$removeTrackedSubreddit',
  version: '1.0.0',
  description: 'Returns removes subreddit from tracking',
  args: [
    {
      name: 'name',
      description: 'subreddit name',
      rest: false,
      required: true,
      type: forgescript_1.ArgType.String,
    },
  ],
  brackets: true,
  unwrap: true,
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [subreddit]) {
    const rs = (0, pollSubreddit_1.removeSubreddit)(subreddit);
    return this.success(rs);
  },
});
//# sourceMappingURL=removeTrackedSubreddit.js.map
