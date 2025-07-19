import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../../utils/redditFetch"
import { ForgeSocial } from "../../.."

export default new NativeFunction({
  name: "$getUserOverview",
  version: "1.0.0",
  description: "Get the users overview",
  args: [
    {
      name: "username",
      description: "The username to get the overview of (without u/)",
      type: ArgType.String,
      rest: true,
      required: true,
    }
  ],
  brackets: true,
  unwrap: true,
  output: ArgType.Json,

  async execute(ctx, [user]) {
    const ext = ctx.client.getExtension("ForgeSocial") as ForgeSocial
    const username = await ext?.getUsername()
    if (!username) return this.customError("No Reddit username found.")
    const token = await ext?.getAccessToken()
    if (!token) return this.customError("No Reddit access token found.")

    let json = await redditFetch(`user/${user}/overview.json`, token, username)
    return this.success(JSON.stringify(json, null, 2))
  }
})
