import https from "https"
import fs from "fs"
import path from "path"
import { Logger } from "@tryforge/forgescript"

import { parse as parseHtml } from "node-html-parser"

export function redditFetch(pathStr: string, accessToken: string, redditUsername: string): Promise<any> {
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
        // Handle 429 rate limit
        if (res.statusCode === 429) {
          const retryHeader = res.headers["retry-after"]
          const retry = parseInt(Array.isArray(retryHeader) ? retryHeader[0] : retryHeader || "10") * 1000
          Logger.warn(`[Reddit API] 429 – retrying in ${retry / 1000}s`)
          await new Promise(resume => setTimeout(resume, retry))
          try {
            const result = await redditFetch(pathStr, accessToken, redditUsername)
            return resolve(result)
          } catch (err) {
            return reject(err)
          }
        }

        // Handle Reddit API rate limit headers
        const remainingHeader = res.headers["x-ratelimit-remaining"]
        const resetHeader = res.headers["x-ratelimit-reset"]
        const remaining = parseFloat(Array.isArray(remainingHeader) ? remainingHeader[0] : remainingHeader || "0")
        const reset = parseFloat(Array.isArray(resetHeader) ? resetHeader[0] : resetHeader || "0")
        if (remaining <= 0) {
          const wait = reset > 0 ? reset * 1000 : 200
          Logger.warn(`[Reddit API] Out of quota, sleeping for ${wait / 1000}s`)
          await new Promise(resume => setTimeout(resume, wait))
        }

        const contentType = res.headers["content-type"]

        // Check if content is HTML (usually error page)
        let looksLikeHtml = false
        if (contentType && contentType.includes("text/html")) {
          looksLikeHtml = true
        } else if (/^\s*<(!doctype|html|head|body|div|span|p|a|script|style)[\s>]/i.test(data)) {
          looksLikeHtml = true
        }

        if (looksLikeHtml) {
          try {
            const root = parseHtml(data)
            // Convert HTML to a simple JSON structure
            const htmlJson = {
              tag: root.tagName,
              attrs: root.rawAttrs,
              text: root.text,
              childNodes: root.childNodes.map((node: any) => node.toString())
            }
            // Try to extract error code/message from HTML if possible
            let errorInfo: any = { html: htmlJson }
            // Look for error code in title or h1/h2
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

        // Try to parse as JSON
        try {
          const parsed = JSON.parse(data)
          if (parsed.error) return reject(Logger.error(parsed.message || "Unknown error"))
          resolve(parsed)
        } catch {
          const logDir = path.join(process.cwd(), "logs")
          if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
          const logPath = path.join(logDir, `redditFetch-error.log`)
          fs.writeFileSync(logPath, data)
          reject(new Error(`Invalid JSON, saved to logs/redditFetch-error.log`))
        }
      })
    })

    req.on("error", reject)
    req.end()
  })
}
