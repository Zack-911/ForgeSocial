'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const redditFetch_1 = require('../../utils/redditFetch');
var type;
(function (type) {
  type[(type['link'] = 0)] = 'link';
  type[(type['comment'] = 1)] = 'comment';
  type[(type['sr'] = 2)] = 'sr';
  type[(type['user'] = 3)] = 'user';
  type[(type['all'] = 4)] = 'all';
})(type || (type = {}));
var sort;
(function (sort) {
  sort[(sort['new'] = 0)] = 'new';
  sort[(sort['hot'] = 1)] = 'hot';
  sort[(sort['top'] = 2)] = 'top';
  sort[(sort['relevance'] = 3)] = 'relevance';
  sort[(sort['comments'] = 4)] = 'comments';
})(sort || (sort = {}));
exports.default = new forgescript_1.NativeFunction({
  name: '$searchReddit',
  version: '1.0.0',
  description: 'Search Reddit for posts, comments, users, or subreddits',
  args: [
    {
      name: 'query',
      description: 'The search query string',
      type: forgescript_1.ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'type',
      description: 'Type of result to return: link, comment, sr, user, or all',
      type: forgescript_1.ArgType.Enum,
      required: false,
      rest: false,
      enum: type,
    },
    {
      name: 'limit',
      description: 'Maximum number of results (default: 25)',
      type: forgescript_1.ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'sort',
      description: 'Sorting method (relevance, hot, new, top, comments)',
      type: forgescript_1.ArgType.Enum,
      required: false,
      rest: false,
      enum: sort,
    },
  ],
  brackets: true,
  unwrap: true,
  output: forgescript_1.ArgType.Json,
  async execute(ctx, [query, type = 'link', limit = 25, sort = 'relevance']) {
    const ext = ctx.client.getExtension('ForgeSocial');
    const username = await ext?.getUsername();
    if (!username) return this.customError('No Reddit username found.');
    const token = await ext?.getAccessToken();
    if (!token) return this.customError('No Reddit access token found.');
    const encodedQuery = encodeURIComponent(query);
    const url = `search.json?q=${encodedQuery}&type=${type}&limit=${limit}&sort=${sort}`;
    const json = await (0, redditFetch_1.redditFetch)(url, token, username);
    if (!json?.data?.children?.length) return this.customError('No results found.');
    return this.success(
      JSON.stringify(
        json.data.children.map((c) => c.data),
        null,
        2,
      ),
    );
  },
});
//# sourceMappingURL=redditSearch.js.map
