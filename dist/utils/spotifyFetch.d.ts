/**
 * Provides a utility for making authenticated requests to the Spotify API.
 * Handles rate limiting (429) and network retries.
 */
export declare function spotifyFetch(pathStr: string, accessToken: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, retries?: number): Promise<any>;
//# sourceMappingURL=spotifyFetch.d.ts.map