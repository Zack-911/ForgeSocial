import https from "https"
import { Logger } from "@tryforge/forgescript"
import { parseStringPromise } from "xml2js"

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

async function handleRateLimitHeaders(res: any) {
  const remaining = parseFloat(res.headers["x-ratelimit-remaining"] || "1")
  const reset = parseFloat(res.headers["x-ratelimit-reset"] || "0")

  if (remaining <= 1) {
    const wait = reset > 0 ? reset * 1000 : 10000
    Logger.warn(`[Reddit API] Rate limit reached, sleeping for ${wait / 1000}s`)
    await sleep(wait)
  }
}

export async function redditFetch(path: string, redditUsername: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "www.reddit.com",
      path: path.startsWith("/") ? path : `/${path}`,
      headers: {
        "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`,
      }
    }

    const req = https.request(options, async (res) => {
      let data = ""
      res.on("data", (chunk) => (data += chunk))
      res.on("end", async () => {
        if (res.statusCode === 429) {
          const retry = parseInt(res.headers["retry-after"] || "10") * 1000
          Logger.warn(`[Reddit API] 429 Too Many Requests – retrying in ${retry / 1000}s`)
          await sleep(retry)
          return resolve(redditFetch(path, redditUsername))
        }

        await handleRateLimitHeaders(res)

        if (path.endsWith(".rss")) {
          const json = await parseStringPromise(data)
          return resolve(json)
        }

        try {
          const parsed = JSON.parse(data)
          if (parsed.error) return reject(Logger.error(`[Reddit API] ${parsed.message || "Unknown error"}`))
          resolve(parsed)
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on("error", reject)
    req.end()
  })
}

export async function redditFetchWAuth(path: string, accessToken: string, redditUsername: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "oauth.reddit.com",
      path: path.startsWith("/") ? path : `/${path}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`
      }
    }

    const req = https.request(options, async (res) => {
      let data = ""
      res.on("data", (chunk) => (data += chunk))
      res.on("end", async () => {
        if (res.statusCode === 429) {
          const retry = parseInt(res.headers["retry-after"] || "10") * 1000
          Logger.warn(`[Reddit API] 429 Too Many Requests – retrying in ${retry / 1000}s`)
          await sleep(retry)
          return resolve(redditFetchWAuth(path, accessToken, redditUsername))
        }

        await handleRateLimitHeaders(res)

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
    })

    req.on("error", reject)
    req.end()
  })
}
