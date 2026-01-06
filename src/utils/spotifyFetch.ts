/* eslint-disable @typescript-eslint/no-explicit-any */
import https from 'https';
import { Logger } from '@tryforge/forgescript';

const MAX_RETRIES = 3;

/**
 * Provides a utility for making authenticated requests to the Spotify API.
 * Handles rate limiting (429) and network retries.
 */
export async function spotifyFetch(
  pathStr: string,
  accessToken: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  retries = 0,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const options: https.RequestOptions = {
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
      (options.headers as any)['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', async () => {
        const status = res.statusCode || 0;

        // 429 - Rate limit exceeded
        if (status === 429) {
          const retryHeader = res.headers['retry-after'];
          const retry =
            parseInt(Array.isArray(retryHeader) ? retryHeader[0] : retryHeader || '5') * 1000;
          Logger.warn(`[Spotify API] 429 Too Many Requests – retrying in ${retry / 1000}s`);
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
          } catch {
            return reject(new Error(`Spotify API error: ${status}`));
          }
        }

        try {
          const parsed = JSON.parse(data);
          return resolve(parsed);
        } catch {
          if (data.length === 0) return resolve({ success: true });
          Logger.error(`[Spotify API] Invalid JSON response: ${data.substring(0, 100)}`);
          return reject(new Error('Invalid JSON response from Spotify API'));
        }
      });
    });

    req.on('error', async (err) => {
      if (retries < MAX_RETRIES) {
        const delay = 1000 * (retries + 1);
        Logger.warn(`[Spotify API] Network error: ${err.message} – retrying in ${delay / 1000}s`);
        await new Promise((r) => setTimeout(r, delay));
        return resolve(spotifyFetch(pathStr, accessToken, method, body, retries + 1));
      } else {
        Logger.error(`[Spotify API] Failed after ${MAX_RETRIES} retries`);
        reject(err);
      }
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}
