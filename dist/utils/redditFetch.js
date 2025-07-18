"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redditFetch = redditFetch;
const https_1 = __importDefault(require("https"));
const forgescript_1 = require("@tryforge/forgescript");
const xml2js_1 = require("xml2js");
function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}
const MIN_DELAY_MS = 200;
const MAX_DELAY_MS = 30_000;
let dynamicDelay = MIN_DELAY_MS;
let queue = [];
let isRunning = false;
function enqueue(fn) {
    queue.push(fn);
    if (!isRunning)
        runQueue();
}
function runQueue() {
    if (isRunning)
        return;
    isRunning = true;
    (async () => {
        while (queue.length > 0) {
            const task = queue.shift();
            await task();
            await sleep(dynamicDelay);
        }
        isRunning = false;
    })();
}
function adjustDelay({ remaining, reset }) {
    let next = Math.ceil((reset * 1000) / Math.max(remaining, 1));
    next = Math.max(MIN_DELAY_MS, Math.min(MAX_DELAY_MS, next));
    if (next !== dynamicDelay) {
        forgescript_1.Logger.warn(`[RateLimit] Adjusting delay from ${dynamicDelay}ms to ${next}ms (rem:${remaining}, reset:${reset}s)`);
        dynamicDelay = next;
    }
}
async function handleRateLimit(res) {
    const remaining = parseFloat(res.headers["x-ratelimit-remaining"] || "0");
    const reset = parseFloat(res.headers["x-ratelimit-reset"] || "0");
    adjustDelay({ remaining, reset });
    if (remaining <= 0) {
        const wait = reset > 0 ? reset * 1000 : MIN_DELAY_MS;
        forgescript_1.Logger.warn(`[Reddit API] Out of quota, sleeping for ${wait / 1000}s`);
        await sleep(wait);
    }
}
function makeRequest(options, isRss) {
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", async () => {
                if (res.statusCode === 429) {
                    const retry = parseInt(res.headers["retry-after"] || "10") * 1000;
                    forgescript_1.Logger.warn(`[Reddit API] 429 – retrying in ${retry / 1000}s`);
                    await sleep(retry);
                    return resolve(makeRequest(options, isRss));
                }
                await handleRateLimit(res);
                if (isRss) {
                    const json = await (0, xml2js_1.parseStringPromise)(data);
                    return resolve(json);
                }
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error)
                        return reject(forgescript_1.Logger.error(parsed.message || "Unknown error"));
                    resolve(parsed);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        req.on("error", reject);
        req.end();
    });
}
function redditFetch(path, accessToken, redditUsername) {
    return new Promise((resolve, reject) => {
        enqueue(async () => {
            const options = {
                method: "GET",
                hostname: "oauth.reddit.com",
                path: path.startsWith("/") ? path : `/${path}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`
                }
            };
            try {
                const res = await makeRequest(options, false);
                resolve(res);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
//# sourceMappingURL=redditFetch.js.map