"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redditFetch = redditFetch;
exports.redditFetchWAuth = redditFetchWAuth;
const https_1 = __importDefault(require("https"));
const forgescript_1 = require("@tryforge/forgescript");
const xml2js_1 = require("xml2js");
async function redditFetch(path, redditUsername) {
    return new Promise((resolve, reject) => {
        const req = https_1.default.request({
            method: "GET",
            hostname: "www.reddit.com",
            path: path.startsWith("/") ? path : `/${path}`,
            headers: {
                "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`,
            }
        }, async (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", async () => {
                if (path.endsWith(".rss")) {
                    const json = await (0, xml2js_1.parseStringPromise)(data);
                    return resolve(json);
                }
                const parsed = JSON.parse(data);
                if (parsed.error)
                    return reject(forgescript_1.Logger.error(`[Reddit API] ${parsed.message || "Unknown error"}`));
                resolve(parsed);
            });
        });
        req.end();
    });
}
async function redditFetchWAuth(path, accessToken, redditUsername) {
    return new Promise((resolve, reject) => {
        const req = https_1.default.request({
            method: "GET",
            hostname: "oauth.reddit.com",
            path: path.startsWith("/") ? path : `/${path}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": `Node.js:ForgeSocialAForgescriptExtension:1.0.0 (by /u/${redditUsername})`
            },
        }, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) {
                        forgescript_1.Logger.error(`[Reddit API] ${parsed.message || "Unknown error"}`);
                        return reject(parsed);
                    }
                    resolve(parsed);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
        req.on("error", reject);
        req.end();
    });
}
//# sourceMappingURL=redditFetch.js.map