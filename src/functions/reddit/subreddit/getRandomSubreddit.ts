import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../../utils/redditFetch"
import { ForgeSocial } from "../../.."

enum filterType {
  popular,
  new
}

export default new NativeFunction({
  name: "$getRandomSubreddit",
  version: "1.0.0",
  description: "Get Random Subreddits info",
  args: [
    {
      name: "filter",
      description: "Filter subreddit list by 'popular' or 'new'",
      type: ArgType.Enum,
      rest: false,
      required: false,
      enum: filterType
    },
    {
      name: "limit",
      description: "Maximum number of subreddits to return (max 25)",
      type: ArgType.Number,
      required: false,
      rest: false,
      default: 5
    }
  ],
  brackets: false,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [filter, limit]) {
    const ext = ctx.client.getExtension("ForgeSocial") as ForgeSocial
    const username = await ext?.getUsername()
    if (!username) return this.customError("No Reddit username found.")
    const token = await ext?.getAccessToken()
    if (!token) return this.customError("No Reddit access token found.")

    limit = typeof limit === "number" ? Math.max(1, Math.min(limit, 25)) : 5

    const json = await redditFetch(`subreddits/${filter ?? ""}.json`, token, username)

    const subreddits = json.data.children.slice(0, limit).map((item: any) => {
      return {
        name: item.data.display_name_prefixed,
        title: item.data.title,
        description: item.data.public_description,
        nsfw: item.data.over18,
        subscribers: item.data.subscribers,
        createdAt: new Date(item.data.created_utc * 1000).toISOString(),
        icon: item.data.icon_img || item.data.community_icon || null,
        banner: item.data.banner_background_image || item.data.banner_img || null,
        type: item.data.subreddit_type,
        lang: item.data.lang,
        url: `https://reddit.com${item.data.url}`
      }
    })

    return this.success(JSON.stringify(subreddits, null, 2))
  }
})