import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../utils/redditFetch"
import { ForgeSocial } from "../.."

export default new NativeFunction({
  name: "$getUserActivity",
  version: "1.0.0",
  description: "Get the users activity page of the name you gave",
  args: [
    {
      name: "username",
      description: "The username to get the activity of (without u/)",
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
    if (!username) return this.customError("No Reddit username found at index file.")

    let json = await redditFetch(`user/${user}/.json`, username)
    return this.success(JSON.stringify(json, null, 2))
  }
})
