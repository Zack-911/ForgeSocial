/**
 * Adds a subreddit to the tracked pool. Does not start polling or perform any other actions.
 * @param subreddit - The subreddit to track (name only, no /r/ prefix)
 * @returns Promise<void>
 */
export declare function trackNewPosts(subreddit: string): Promise<void>;
/**
 * Returns a copy of all currently tracked subreddits.
 * @returns Array of tracked subreddit names.
 */
export declare function getAllTrackedSubreddits(): string[];
/**
 * Removes a subreddit from tracking and deletes its newest post ID, then updates the JSON file.
 * @param subreddit - The subreddit to remove
 * @returns Promise resolving to true if removed, false if not found
 */
export declare function removeSubreddit(subreddit: string): Promise<boolean>;
/**
 * Starts polling for all currently tracked subreddits without adding any new ones.
 * Calls onNewPost for each new post found.
 * @param accessToken - OAuth access token for Reddit API
 * @param redditUsername - Reddit username for API requests
 * @param onNewPost - Callback invoked with each new post object
 * @returns Promise<void>
 */
export declare function startPollingTrackedSubreddits(accessToken: string, redditUsername: string, onNewPost: (post: Record<string, unknown>) => void): Promise<void>;
/**
 * Saves all tracked subreddits and their newest post IDs to a JSON file.
 * @returns Promise<void>
 */
export declare function saveTrackedSubredditsToFile(): Promise<void>;
/**
 * Loads tracked subreddits and their newest post IDs from a JSON file and adds them to the tracker.
 * @returns Promise<void>
 */
export declare function loadTrackedSubredditsFromFile(): Promise<void>;
//# sourceMappingURL=pollSubreddit.d.ts.map