import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../utils/redditFetch"
import { ForgeSocial } from "../.."

enum type {
  link,
  comment,
  sr,
  user,
  all
}

enum sort {
  new,
  hot,
  top,
  relevance,
  comments
}

export default new NativeFunction({
  name: "$searchReddit",
  version: "1.0.0",
  description: "Search Reddit for posts, comments, users, or subreddits",
  args: [
    {
      name: "query",
      description: "The search query string",
      type: ArgType.String,
      required: true,
      rest: false
    },
    {
      name: "type",
      description: "Type of result to return: link, comment, sr, user, or all",
      type: ArgType.Enum,
      required: false,
      rest: false,
      enum: type
    },
    {
      name: "limit",
      description: "Maximum number of results (default: 25)",
      type: ArgType.Number,
      required: false,
      rest: false
    },
    {
      name: "sort",
      description: "Sorting method (relevance, hot, new, top, comments)",
      type: ArgType.Enum,
      required: false,
      rest: false,
      enum: sort
    }
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [query, type = "link", limit = 25, sort = "relevance"]) {
    const ext = ctx.client.getExtension("ForgeSocial") as ForgeSocial
    const username = await ext?.getUsername()
    if (!username) return this.customError("No Reddit username found.")
    const token = await ext?.getAccessToken()
    if (!token) return this.customError("No Reddit access token found.")

    const encodedQuery = encodeURIComponent(query)
    const url = `search.json?q=${encodedQuery}&type=${type}&limit=${limit}&sort=${sort}`

    const json = await redditFetch(url, token, username)
    if (!json?.data?.children?.length) return this.customError("No results found.")

    return this.success(JSON.stringify(json.data.children.map((c: any) => c.data), null, 2))
  }
})
