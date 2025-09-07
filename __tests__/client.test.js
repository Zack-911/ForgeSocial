const { ForgeClient } = require('@tryforge/forgescript');
const { ForgeSocial, ClientType } = require('../dist');
const dotenv = require('dotenv');
dotenv.config();

const reddit = new ForgeSocial({
  events: ['newRedditPost', 'newYoutubeVideo', 'youtubeAuthPending', 'youtubeAuth', 'youtubeAuthError'],
  github: {
    token: process.env.GITHUB_TOKEN,
    log: false,
  },
  youtube: {
    enabled: true,
    userAgent: process.env.YOUTUBE_UA,
    client: ClientType.TV,
    cache: true,
    log: 'NONE',
  },
  reddit: {
    redditUsername: process.env.REDDIT_USERNAME,
    clientID: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
  },
});

const client = new ForgeClient({
  extensions: [reddit],
  events: ['messageCreate'],
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
  prefixes: ['.'],
});

reddit.commands.add({
  type: 'newRedditPost',
  code: `
    $log[$socialEventData]
  `,
});

reddit.commands.add({
  type: 'newYoutubeVideo',
  code: `
    $log[This is the command uwu. $socialEventData]
  `,
});

reddit.commands.add({
  type: 'youtubeAuthPending',
  code: `
    $log[$socialEventData hi]
  `,
})

reddit.commands.add({
  type: 'youtubeAuth',
  code: `
    $log[$socialEventData hi]
  `,
})

reddit.commands.add({
  type: 'youtubeAuthError',
  code: `
    $log[$socialEventData hi]
  `,
})

client.commands.load('./__tests__/commands');

client.login(process.env.TOKEN);
