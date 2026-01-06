"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyFetch = spotifyFetch;
/* eslint-disable @typescript-eslint/no-explicit-any */
const https_1 = __importDefault(require("https"));
const forgescript_1 = require("@tryforge/forgescript");
const MAX_RETRIES = 3;
/**
 * Provides a utility for making authenticated requests to the Spotify API.
 * Handles rate limiting (429) and network retries.
 */
async function spotifyFetch(pathStr, accessToken, method = 'GET', body, retries = 0) {
    return new Promise((resolve, reject) => {
        const postData = body ? JSON.stringify(body) : '';
        const options = {
            method,
            hostname: 'api.spotify.com',
            path: pathStr.startsWith('/v1')
                ? pathStr
                : `/v1${pathStr.startsWith('/') ? pathStr : `/${pathStr}`}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        if (postData) {
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }
        const req = https_1.default.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', async () => {
                const status = res.statusCode || 0;
                // 429 - Rate limit exceeded
                if (status === 429) {
                    const retryHeader = res.headers['retry-after'];
                    const retry = parseInt(Array.isArray(retryHeader) ? retryHeader[0] : retryHeader || '5') * 1000;
                    forgescript_1.Logger.warn(`[Spotify API] 429 Too Many Requests – retrying in ${retry / 1000}s`);
                    await new Promise((r) => setTimeout(r, retry));
                    return resolve(spotifyFetch(pathStr, accessToken, method, body, retries + 1));
                }
                if (status === 204) {
                    return resolve({ success: true, status: 204 });
                }
                if (status >= 400) {
                    try {
                        const parsed = JSON.parse(data);
                        return reject(new Error(parsed.error?.message || `Spotify API error: ${status}`));
                    }
                    catch {
                        return reject(new Error(`Spotify API error: ${status}`));
                    }
                }
                try {
                    const parsed = JSON.parse(data);
                    return resolve(parsed);
                }
                catch {
                    if (data.length === 0)
                        return resolve({ success: true });
                    forgescript_1.Logger.error(`[Spotify API] Invalid JSON response: ${data.substring(0, 100)}`);
                    return reject(new Error('Invalid JSON response from Spotify API'));
                }
            });
        });
        req.on('error', async (err) => {
            if (retries < MAX_RETRIES) {
                const delay = 1000 * (retries + 1);
                forgescript_1.Logger.warn(`[Spotify API] Network error: ${err.message} – retrying in ${delay / 1000}s`);
                await new Promise((r) => setTimeout(r, delay));
                return resolve(spotifyFetch(pathStr, accessToken, method, body, retries + 1));
            }
            else {
                forgescript_1.Logger.error(`[Spotify API] Failed after ${MAX_RETRIES} retries`);
                reject(err);
            }
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}
//# sourceMappingURL=spotifyFetch.js.map