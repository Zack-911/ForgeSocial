import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { redditFetch } from '../../utils/redditFetch';
import { ForgeSocial } from '../..';

enum sort {
  new,
  hot,
  top,
  relevance,
  comments,
}

export default new NativeFunction({
  name: '$searchSubredditPosts',
  version: '1.0.0',
  description: 'Search for posts within a specific subreddit',
  args: [
    {
      name: 'subreddit',
      description: 'The subreddit to search in',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'query',
      description: 'The search query string',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'limit',
      description: 'Maximum number of results (default: 25)',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'sort',
      description: 'Sorting method (relevance, hot, new, top, comments)',
      type: ArgType.Enum,
      enum: sort,
      required: false,
      rest: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [subreddit, query, limit = 25, sort = 'relevance']) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const username = await ext?.getUsername();
    if (!username) return this.customError('No Reddit username found.');
    const token = await ext?.getRedditAccessToken();
    if (!token) return this.customError('No Reddit access token found.');

    const encodedQuery = encodeURIComponent(query);
    const url = `r/${subreddit}/search.json?q=${encodedQuery}&type=link&limit=${limit}&sort=${sort}`;

    const json = await redditFetch(url, token, username);
    if (!json?.data?.children?.length) return this.customError('No posts found for this query.');

    return this.success(
      JSON.stringify(
        json.data.children.map((c: typeof json) => c.data),
        null,
        2,
      ),
    );
  },
});
