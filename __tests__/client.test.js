const { ForgeClient } = require('@tryforge/forgescript');
const { ForgeSocial } = require('../dist');
const dotenv = require('dotenv');
dotenv.config();

const reddit = new ForgeSocial({
  events: ['error', 'newRedditPost', 'newYoutubeVideo'],
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redditUsername: process.env.REDDIT_USERNAME,
});

const client = new ForgeClient({
  extensions: [reddit],
  events: ['messageCreate', 'ready'],
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

client.commands.add({
  type: 'ready',
  code: `
    $log[Client is ready!]
  `,
});
