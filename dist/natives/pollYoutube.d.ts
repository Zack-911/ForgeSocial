/**
 * Adds a channel to the tracked set and persists it.
 */
export declare function trackNewVideos(channelId: string): Promise<void>;
/**
 * Returns a copy of all tracked channel IDs.
 */
export declare function getAllTrackedChannels(): string[];
/**
 * Removes a channel from tracking and persists the change.
 */
export declare function removeChannel(channelId: string): Promise<boolean>;
/**
 * Start background polling using RSS.
 * NOTE: This function is non-async and returns immediately (no infinite await).
 *
 * @param _ext - unused placeholder to match existing call sites
 * @param onNewVideo - callback invoked whenever a new video is detected
 */
export declare function startPollingTrackedChannels(
  _ext: any,
  onNewVideo: (video: Record<string, unknown>) => void,
): void;
/**
 * Persist tracker state to disk.
 */
export declare function saveTrackedChannelsToFile(): Promise<void>;
/**
 * Load tracker state from disk.
 * Gracefully handles a missing file or invalid JSON by starting from empty state.
 */
export declare function loadTrackedChannelsFromFile(): Promise<void>;
//# sourceMappingURL=pollYoutube.d.ts.map
