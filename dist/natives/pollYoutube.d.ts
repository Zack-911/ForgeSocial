export declare function trackNewVideos(channelId: string): Promise<void>;
export declare function getAllTrackedChannels(): string[];
export declare function removeChannel(channelId: string): Promise<boolean>;
/**
 * Starts sequential polling using RSS.
 */
export declare function startPollingTrackedChannels(_ext: any, onNewVideo: (video: Record<string, unknown>) => void): Promise<void>;
export declare function saveTrackedChannelsToFile(): Promise<void>;
export declare function loadTrackedChannelsFromFile(): Promise<void>;
//# sourceMappingURL=pollYoutube.d.ts.map