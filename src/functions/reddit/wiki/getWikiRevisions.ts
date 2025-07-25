import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { redditFetch } from '../../../utils/redditFetch';
import { ForgeSocial } from '../../..';

export default new NativeFunction({
  name: '$getWikiRevisions',
  version: '1.0.0',
  description:
    'Get the subreddit wiki page revisions. Returns all revisions if page not specified. ',
  args: [
    {
      name: 'subreddit',
      description: 'The subreddit to get the wiki revisions of',
      type: ArgType.String,
      rest: false,
      required: true,
    },
    {
      name: 'page',
      description: 'The page name to get the revisions of',
      type: ArgType.String,
      rest: false,
      required: false,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [subreddit, page]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const username = await ext?.getUsername();
    if (!username) return this.customError('No Reddit username found.');
    const token = await ext?.getAccessToken();
    if (!token) return this.customError('No Reddit access token found.');

    if (page) {
      let json = await redditFetch(`r/${subreddit}/wiki/revisions/${page}.json`, token, username);
      return this.success(JSON.stringify(json, null, 2));
    } else {
      let json = await redditFetch(`r/${subreddit}/wiki/revisions/.json`, token, username);
      return this.success(JSON.stringify(json, null, 2));
    }
  },
});
