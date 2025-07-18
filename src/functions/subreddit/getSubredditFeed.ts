import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../utils/redditFetch"
import { ForgeSocial } from "../.."

enum filterType {
  best,
  popular,
  new,
  hot,
  top,
  rising,
}

export default new NativeFunction({
  name: "$getSubredditFeed",
  version: "1.0.0",
  description: "Get the readable subreddit feed (title, author, upvotes, etc)",
  args: [
    {
      name: "subreddit",
      description: "The subreddit to get the feed of",
      type: ArgType.String,
      rest: false,
      required: true,
    },
    {
      name: "filter",
      description: "Filter the posts by what you want bbg",
      type: ArgType.Enum,
      enum: filterType,
      rest: false,
      required: false,
    },
    {
      name: "limit",
      description: "Maximum number of posts to return (max 25)",
      type: ArgType.Number,
      required: false,
      rest: false
    }
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [subreddit, filter, limit]) {
    const ext = ctx.client.getExtension("ForgeSocial") as ForgeSocial
    const username = await ext?.getUsername()
    if (!username) return this.customError("No Reddit username found.")
    const token = await ext?.getAccessToken()
    if (!token) return this.customError("No Reddit access token found.")

    limit = typeof limit === "number" ? Math.max(1, Math.min(limit, 25)) : 5

    const json = await redditFetch(`r/${subreddit}/${filter ?? ""}.json`, token, username)

    const posts = json.data.children.slice(0, limit).map((item: any) => {
      const post = item.data

      let images: string[] = []
      if (post.media_metadata) {
        images = Object.values(post.media_metadata)
          .map((entry: any) => entry?.s?.u)
          .filter((u: any) => typeof u === "string")
          .map((u: string) => u.replace(/&amp;/g, "&"))
      }

      return {
        title: post.title,
        author: post.author,
        subreddit: post.subreddit_name_prefixed,
        score: post.score,
        comments: post.num_comments,
        flair: post.link_flair_text,
        nsfw: post.over_18,
        createdAt: new Date(post.created_utc * 1000).toISOString(),
        url: `https://reddit.com${post.permalink}`,
        thumbnail: post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : null,
        isVideo: post.is_video,
        media: post.media,
        images
      }
    })

    return this.success(JSON.stringify(posts, null, 2))
  }
})
