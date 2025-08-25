const { ForgeClient } = require('@tryforge/forgescript');
const { ForgeSocial } = require('../dist');
const dotenv = require('dotenv');
dotenv.config();

const reddit = new ForgeSocial({
  events: ['error', 'newRedditPost', 'newYoutubeVideo'],
  github: {
    token: process.env.GITHUB_TOKEN,
    log: false,
  },
  youtube: {
    enabled: true,
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
    $log[$newSubredditJson]
  `,
});

reddit.commands.add({
  type: 'newYoutubeVideo',
  code: `
    $log[This is the command uwu. $newSubredditJson]
  `,
});

client.commands.load('./__tests__/commands');

client.login(process.env.TOKEN);

client.on('clientReady', () => {
  console.log('Client is ready!');
});
