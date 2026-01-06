import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { redditFetch } from '../../utils/redditFetch';
import { ForgeSocial } from '../..';

export default new NativeFunction({
  name: '$getSubreddit',
  version: '1.0.0',
  description: 'Get the subreddit about page of the name you gave',
  args: [
    {
      name: 'subreddit',
      description: 'The subreddit to get the about page of',
      type: ArgType.String,
      rest: true,
      required: true,
    },
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [subreddit]) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const username = await ext?.getUsername();
    if (!username) return this.customError('No Reddit username found at index file.');
    const token = await ext?.getAccessToken();
    if (!token) return this.customError('No Reddit access token found.');

    let json = await redditFetch(`r/${subreddit}/about.json`, token, username);

    json = {
      name: json.data.display_name_prefixed,
      title: json.data.title,
      description: json.data.public_description,
      nsfw: json.data.over18,
      subscribers: json.data.subscribers,
      activeUsers: json.data.accounts_active,
      createdAt: new Date(json.data.created_utc * 1000).toISOString(),
      icon: json.data.icon_img || json.data.community_icon || null,
      banner: json.data.banner_background_image || json.data.banner_img || null,
      type: json.data.subreddit_type,
      lang: json.data.lang,
      url: `https://reddit.com${json.data.url}`,
    };

    return this.success(JSON.stringify(json, null, 2));
  },
});
