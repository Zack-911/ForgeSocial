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
export declare function redditFetch(
  pathStr: string,
  accessToken: string,
  redditUsername: string,
  retries?: number,
): Promise<any>;
//# sourceMappingURL=redditFetch.d.ts.map
