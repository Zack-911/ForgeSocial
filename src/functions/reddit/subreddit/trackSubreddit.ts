import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { trackNewPosts } from "../../../natives/pollSubreddit"
import { ForgeSocial } from "../../.."

export default new NativeFunction({
  name: "$trackSubreddit",
  version: "1.0.0",
  description: "Track subreddits new posts",
  args: [
    {
      name: "subreddit",
      description: "The subreddit to track",
      type: ArgType.String,
      rest: false,
      required: true
    }
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [subreddit]: [string]) {
    trackNewPosts(subreddit)
    return this.success(true)
  }
})
