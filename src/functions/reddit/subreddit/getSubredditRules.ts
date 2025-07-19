import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../../utils/redditFetch"
import { ForgeSocial } from "../../.."

export default new NativeFunction({
  name: "$getSubredditRules",
  version: "1.0.0",
  description: "Get the rules for a subreddit",
  args: [
    {
      name: "subreddit",
      description: "The subreddit to get the rules for",
      type: ArgType.String,
      rest: false,
      required: true
    }
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,
  async execute(ctx, [subreddit]) {
    const ext = ctx.client.getExtension("ForgeSocial") as ForgeSocial
    const username = await ext?.getUsername()
    if (!username) return this.customError("No Reddit username found.")
    const token = await ext?.getAccessToken()
    if (!token) return this.customError("No Reddit access token found.")

    const json = await redditFetch(`r/${subreddit}/about/rules.json`, token, username)
    if (!json.rules) return this.customError("No rules found for this subreddit.")
    return this.success(JSON.stringify(json.rules, null, 2))
  }
})
