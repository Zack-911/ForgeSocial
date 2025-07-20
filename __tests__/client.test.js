const { ForgeClient } = require('@tryforge/forgescript');
const { ForgeSocial } = require('../dist');

const reddit = new ForgeSocial({
  events: ['error', 'newRedditPost', 'newYoutubeVideo'],
  clientID: '',
  clientSecret: '',
  redditUsername: 'Pure_Panda_8291',
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
    $log[$newSubredditJson]
  `,
});

client.commands.load('./__tests__/commands');

client.login('');
