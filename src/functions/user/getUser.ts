import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { redditFetch } from "../../utils/redditFetch"
import { ForgeSocial } from "../.."

export default new NativeFunction({
  name: "$getUser",
  version: "1.0.0",
  description: "Get the users info about page of the name you gave",
  args: [
    {
      name: "username",
      description: "The username to get the info of (without u/)",
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

    let json = await redditFetch(`user/${user}/about.json`, username)
    return this.success(JSON.stringify(json, null, 2))
  }
})
