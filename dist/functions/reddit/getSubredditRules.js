'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const redditFetch_1 = require('../../utils/redditFetch');
exports.default = new forgescript_1.NativeFunction({
  name: '$getSubredditRules',
  version: '1.0.0',
  description: 'Get the rules for a subreddit',
  args: [
    {
      name: 'subreddit',
      description: 'The subreddit to get the rules for',
      type: forgescript_1.ArgType.String,
      rest: false,
      required: true,
    },
  ],
  brackets: true,
  unwrap: true,
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [subreddit]) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const username = await ext?.getUsername();
    if (!username) return this.customError('No Reddit username found.');
    const token = await ext?.getAccessToken();
    if (!token) return this.customError('No Reddit access token found.');
    const json = await (0, redditFetch_1.redditFetch)(
      `r/${subreddit}/about/rules.json`,
      token,
      username,
    );
    if (!json.rules) return this.customError('No rules found for this subreddit.');
    return this.success(JSON.stringify(json.rules, null, 2));
  },
});
//# sourceMappingURL=getSubredditRules.js.map
