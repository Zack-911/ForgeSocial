export declare function trackNewVideos(channelId: string): Promise<void>;
export declare function getAllTrackedChannels(): string[];
export declare function removeChannel(channelId: string): Promise<boolean>;
/**
 * Starts polling for all currently tracked channels.
 * Fetches only the latest uploads per channel.
 */
export declare function startPollingTrackedChannels(ext: any, onNewVideo: (video: Record<string, unknown>) => void, pollIntervalMs?: number): Promise<void>;
export declare function saveTrackedChannelsToFile(): Promise<void>;
export declare function loadTrackedChannelsFromFile(): Promise<void>;
//# sourceMappingURL=pollYoutube.d.ts.map