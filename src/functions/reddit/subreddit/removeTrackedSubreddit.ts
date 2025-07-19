import { NativeFunction, ArgType} from "@tryforge/forgescript"
import { removeSubreddit } from "../../../natives/pollSubreddit";

export default new NativeFunction({
  name: "$removeTrackedSubreddit",
  version: "1.0.0",
  description: "Returns removes subreddit from tracking",
  args: [
    {
      name: "name",
      description: "subreddit name",
      rest: false,
      required: true,
      type: ArgType.String
    }
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,
  async execute(ctx, [subreddit]) {
    const rs = removeSubreddit(subreddit)
    return this.success(rs)
  }
})