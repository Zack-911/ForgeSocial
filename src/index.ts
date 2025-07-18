import { EventManager, ForgeClient, ForgeExtension, Logger } from "@tryforge/forgescript"
import { ForgeSocialEventManagerName } from "./constants"
import { ForgeSocialCommandManager } from "./structures/ForgeSocialCommandManager"
import { IForgeSocialEvents } from "./structures/ForgeSocialEventHandlers"
import { TypedEmitter } from "tiny-typed-emitter"
import https from "https"

export interface IForgeSocialOptions {
  events?: Array<keyof IForgeSocialEvents>
  clientID?: string
  clientSecret?: string
  redditUsername: string
}

export type TransformEvents<T> = {
  [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never
}

export class ForgeSocial extends ForgeExtension {
  name = "ForgeSocial"
  description = "An extension that lets you interact with reddit."
  version = require("../package.json").version

  private client!: ForgeClient
  private emitter = new TypedEmitter<TransformEvents<IForgeSocialEvents>>()

  private accessToken: string = ""
  private tokenExpiresAt: number = 0
  private tokenRefreshInterval: NodeJS.Timeout | null = null

  public commands!: ForgeSocialCommandManager

  public constructor(private readonly options: IForgeSocialOptions) {
    super()
  }

  async init(client: ForgeClient) {
    this.client = client
    this.commands = new ForgeSocialCommandManager(client)

    EventManager.load(ForgeSocialEventManagerName, __dirname + `/events`)
    this.load(__dirname + `/functions`)

    if (this.options.events?.length)
      this.client.events.load(ForgeSocialEventManagerName, this.options.events)
    await this.refreshToken()
  }

  public async getAccessToken(): Promise<string> {
    return this.accessToken
  }

  public async getUsername(): Promise<string> {
    return this.options.redditUsername
  }

  private async refreshToken() {
    const { clientID, clientSecret, redditUsername } = this.options

    if (!clientID || !clientSecret) {
      Logger.warn("ForgeSocial: Skipping token refresh. Client ID or Secret not provided.This may result in some functions like $getSubredditMods to not work due to reddit requiring authentication for it.")
      return
    }

    if (!redditUsername) {
      Logger.error("ForgeSocial: Missing redditUsername field in index file. This will result in almost all functions not working. This is required so it can be sent to reddit via user-agent because reddit requires it.")
      return
    }

    const body = new URLSearchParams({ grant_type: "client_credentials" })
    const creds = Buffer.from(`${clientID}:${clientSecret}`).toString("base64")

    const tokenData = await new Promise<{ access_token: string; expires_in: number }>((resolve, reject) => {
      const req = https.request(
        {
          method: "POST",
          hostname: "www.reddit.com",
          path: "/api/v1/access_token",
          headers: {
            Authorization: `Basic ${creds}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": body.toString().length,
            "User-Agent": `web:forge.reddit-extension:1.0.0 (discord bot by /u/${this.options.redditUsername})`
          }
        },
        res => {
          let data = ""
          res.on("data", chunk => (data += chunk))
          res.on("end", () => {
            try {
              resolve(JSON.parse(data))
            } catch (err) {
              reject(err)
            }
          })
        }
      )
      req.on("error", reject)
      req.write(body.toString())
      req.end()
    })

    this.accessToken = tokenData.access_token
    this.tokenExpiresAt = Date.now() + tokenData.expires_in * 1000
    Logger.info("ForgeSocial: Access token refreshed.:\n" + this.accessToken)

    if (this.tokenRefreshInterval) clearInterval(this.tokenRefreshInterval)

    this.tokenRefreshInterval = setInterval(() => {
      if (Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000) {
        this.refreshToken().catch(console.error)
      }
    }, 60 * 1000)
  }
}