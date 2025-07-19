/**
 * Provides a utility for making authenticated requests to the Reddit API with built-in rate limit, retry, and error handling.
 * Handles JSON and HTML error responses, rate limiting, and network retries.
 */
import https from "https"
import fs from "fs"
import path from "path"
import { Logger } from "@tryforge/forgescript"
import { parse as parseHtml } from "node-html-parser"

const MAX_RETRIES = 3

/**
 * Makes an authenticated GET request to the Reddit API, handling rate limits, retries, and HTML error responses.
 *
 * @param pathStr - The API path (e.g., "/r/all/new?limit=5").
 * @param accessToken - OAuth access token for Reddit API.
 * @param redditUsername - Reddit username for user-agent header.
 * @param retries - (Internal) Number of retry attempts so far.
 * @returns Promise resolving to the parsed JSON response, or an HTML error object if Reddit returns HTML.
 *
 * Handles:
 *   - 429 and x-ratelimit headers (waits and retries as needed)
 *   - Network errors (retries up to MAX_RETRIES)
 *   - HTML error pages (parses and returns as object)
 *   - Logs invalid JSON responses to logs/redditFetch-error.log
 */
export function redditFetch(pathStr: string, accessToken: string, redditUsername: string, retries = 0): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "oauth.reddit.com",
      path: pathStr.startsWith("/") ? pathStr : `/${pathStr}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`
      }
    }

    const req = https.request(options, (res) => {
      let data = ""
      res.on("data", (chunk) => (data += chunk))
      res.on("end", async () => {
        const status = res.statusCode || 0

        // 429 - Rate limit exceeded
        if (status === 429) {
          const retryHeader = res.headers["retry-after"]
          const retry = parseInt(Array.isArray(retryHeader) ? retryHeader[0] : retryHeader || "10") * 1000
          Logger.warn(`[Reddit API] 429 Too Many Requests – retrying in ${retry / 1000}s`)
          await new Promise(r => setTimeout(r, retry))
          return resolve(redditFetch(pathStr, accessToken, redditUsername, retries + 1))
        }

        // x-ratelimit check
        const remainingHeader = res.headers["x-ratelimit-remaining"]
        const resetHeader = res.headers["x-ratelimit-reset"]
        const remaining = parseFloat(Array.isArray(remainingHeader) ? remainingHeader[0] : remainingHeader || "0")
        const reset = parseFloat(Array.isArray(resetHeader) ? resetHeader[0] : resetHeader || "0")
        if (!isNaN(remaining) && remaining <= 0) {
          const wait = isNaN(reset) ? 5000 : reset * 1000
          Logger.warn(`[Reddit API] Rate quota exhausted – sleeping for ${wait / 1000}s`)
          await new Promise(r => setTimeout(r, wait))
        }

        // HTML fallback (Reddit sometimes returns HTML error page)
        const contentType = res.headers["content-type"]
        let isHtml = false

        if (contentType && contentType.includes("text/html")) {
          isHtml = true
        } else if (/^\s*<(html|head|body|div|script)/i.test(data)) {
          isHtml = true
        }

        if (isHtml) {
          try {
            const root = parseHtml(data)
            const htmlJson = {
              tag: root.tagName,
              attrs: root.rawAttrs,
              text: root.text,
              childNodes: root.childNodes.map((node: any) => node.toString())
            }

            const errorInfo: any = { html: htmlJson }
            const title = root.querySelector("title")
            if (title) errorInfo.title = title.text
            const h1 = root.querySelector("h1")
            if (h1) errorInfo.h1 = h1.text
            const h2 = root.querySelector("h2")
            if (h2) errorInfo.h2 = h2.text
            return resolve(errorInfo)
          } catch (e) {
            Logger.error("Failed to parse HTML response")
            return reject(e)
          }
        }

        try {
          const parsed = JSON.parse(data)
          if (parsed.error) {
            const message = parsed.message || `Reddit API error code ${parsed.error}`
            Logger.error(`[Reddit API] ${message}`)
            return reject(new Error(message))
          }
          return resolve(parsed)
        } catch (e) {
          const logDir = path.join(process.cwd(), "logs")
          if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
          const logPath = path.join(logDir, `redditFetch-error.log`)
          fs.writeFileSync(logPath, data)
          return reject(new Error("Invalid JSON, saved to logs/redditFetch-error.log"))
        }
      })
    })

    req.on("error", async (err) => {
      if (retries < MAX_RETRIES) {
        const delay = 1000 * (retries + 1)
        Logger.warn(`[Reddit API] Network error: ${err.message} – retrying in ${delay / 1000}s`)
        await new Promise(r => setTimeout(r, delay))
        return resolve(redditFetch(pathStr, accessToken, redditUsername, retries + 1))
      } else {
        Logger.error(`[Reddit API] Failed after ${MAX_RETRIES} retries`)
        reject(err)
      }
    })

    req.end()
  })
}
