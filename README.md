# ForgeSocial

Interact easily with all social platforms including **Reddit**, **Youtube (WIP)**, **X (WIP)** & **Twitch (WIP)*** easily all through one extension which handles all the boring stuff so you get to do the fun stuff!

# Setup
```js
import { ForgeSocial } from "forgeSocial"

const reddit = new ForgeSocial({
  events: [
      "error"
  ],
  redditUsername: "",
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
```

Ps:
ForgeSocial will never support platforms like onlyfans or cornhub. If it makes you moan more than code I wont be adding that platform.