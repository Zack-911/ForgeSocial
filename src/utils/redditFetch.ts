import https from "https"
import { Logger, Return } from "@tryforge/forgescript"
import { parseStringPromise } from "xml2js"

export async function redditFetch(path: string, redditUsername: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method: "GET",
        hostname: "www.reddit.com",
        path: path.startsWith("/") ? path : `/${path}`,
        headers: {
          "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`,
        }
      },
      async (res) => {
        let data = ""
        res.on("data", (chunk) => (data += chunk))
        res.on("end", async () => {
          if (path.endsWith(".rss")) {
            const json = await parseStringPromise(data)
            return resolve(json)
          }
          const parsed = JSON.parse(data)
          if (parsed.error) return reject(Logger.error(`[Reddit API] ${parsed.message || "Unknown error"}`))
          resolve(parsed)
        })
      }
    )
    req.end()
  })
}

export async function redditFetchWAuth(path: string, accessToken: string, redditUsername: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method: "GET",
        hostname: "oauth.reddit.com",
        path: path.startsWith("/") ? path : `/${path}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`
        },
      },
      (res) => {
        let data = ""
        res.on("data", (chunk) => (data += chunk))
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data)
            if (parsed.error) {
              Logger.error(`[Reddit API] ${parsed.message || "Unknown error"}`)
              return reject(parsed)
            }
            resolve(parsed)
          } catch (err) {
            reject(err)
          }
        })
      }
    )
    req.on("error", reject)
    req.end()
  })
}