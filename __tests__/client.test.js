const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeSocial} = require('../dist')

const reddit = new ForgeSocial({
  events: [
      "error"
  ],
  clientID: "CSCkqDQqyvDlqwkfD64cww",
  clientSecret: "yczbGCeGA6aAEGp8VoFaRmteDhkv-g",
  redditUsername: "Pure_Panda_8291",
})

const client = new ForgeClient({
  extensions: [
    reddit
  ],
  events: [
    'messageCreate'
  ],
  intents: [
    'Guilds',
    'GuildMessages',
    'MessageContent'
  ],
  prefixes: ['.']
})

client.commands.load('./__tests__/commands')

client.login('MTMzOTYyMTMzNjc3NDg3MzA4OA.GkuFAh.ZZx49e_rWR_ft-6cTiGV6pRK9zDZs-biqb4jDQ')
