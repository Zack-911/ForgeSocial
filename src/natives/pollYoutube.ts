/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import * as path from 'path';
import { ForgeSocial } from '..';

/**
 * Tracks state for polling YouTube channels for new videos.
 */
type YoutubeTracker = {
  seen: Set<string>;
  channels: string[];
  groupIndex: number;
  newest: Record<string, string | null>;
};

const tracker: YoutubeTracker = {
  seen: new Set(),
  channels: [],
  groupIndex: 0,
  newest: {},
};

// Per-channel cooldown timer (ms timestamp)
const errorCooldowns: Record<string, number> = {};

function getGroups(arr: string[], size: number): string[][] {
  const groups: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size));
  }
  return groups;
}

export async function trackNewVideos(channelId: string): Promise<void> {
  if (!tracker.channels.includes(channelId)) {
    tracker.channels.push(channelId);
    tracker.newest[channelId] = null;
    await saveTrackedChannelsToFile();
  }
}

export function getAllTrackedChannels(): string[] {
  return [...tracker.channels];
}

export async function removeChannel(channelId: string): Promise<boolean> {
  const idx = tracker.channels.indexOf(channelId);
  if (idx !== -1) {
    tracker.channels.splice(idx, 1);
    delete tracker.newest[channelId];
    await saveTrackedChannelsToFile();
    return true;
  }
  return false;
}

/**
 * Starts polling for all currently tracked channels.
 * Fetches only the latest uploads per channel.
 */
export async function startPollingTrackedChannels(
  ext: any,
  onNewVideo: (video: Record<string, unknown>) => void,
  pollIntervalMs = 300_000, // 5 minutes
): Promise<void> {
  if (tracker.channels.length === 0) return;

  const groups = getGroups(tracker.channels, 10);

  async function pollGroup() {
    const now = Date.now();
    const group = groups[tracker.groupIndex % groups.length];
    tracker.groupIndex++;

    for (const channelId of group) {
      if (errorCooldowns[channelId] > now) continue;

      try {
        const channel = await ext.youtube?.getChannel(channelId);
        function isFeedWithItems(obj: unknown): obj is { items: any[] } {
          return typeof obj === 'object' && obj !== null && Array.isArray((obj as any).items);
        }
        const videosTab = await channel?.getVideos();

        if (!isFeedWithItems(videosTab)) continue;

        const latestVideos = videosTab.items.filter((item: any) => item?.type === 'Video');

        if (latestVideos.length === 0) continue;

        // First-ever poll: seed newest + seen
        if (tracker.newest[channelId] == null) {
          tracker.newest[channelId] = latestVideos[0].id;
          latestVideos.forEach((v: any) => tracker.seen.add(v.id));
          continue;
        }

        // Notify for truly new videos
        for (const vid of latestVideos) {
          if (!tracker.seen.has(vid.id)) {
            // Only notify until latest known
            if (vid.id !== tracker.newest[channelId]) {
              onNewVideo(vid);
            }
            tracker.seen.add(vid.id);
            // Kap oldest entries
            if (tracker.seen.size > 1000) {
              const o = tracker.seen.values().next().value;
              tracker.seen.delete(o as string);
            }
          }
        }

        // Update newest pointer
        tracker.newest[channelId] = latestVideos[0].id;
      } catch (err) {
        console.error(`[YOUTUBE POLL] Error on ${channelId}:`, err);
        errorCooldowns[channelId] = Date.now() + pollIntervalMs;
      }
    }
  }

  // Kick off polling loop
  setInterval(pollGroup, pollIntervalMs);
}

const TRACKED_FILE = path.resolve(__dirname, '../../tracked_youtube_channels.json');

export async function saveTrackedChannelsToFile(): Promise<void> {
  const data = {
    channels: tracker.channels,
    newest: tracker.newest,
    seen: Array.from(tracker.seen),
  };
  await fs.writeFile(TRACKED_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function loadTrackedChannelsFromFile(): Promise<void> {
  try {
    const raw = await fs.readFile(TRACKED_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (Array.isArray(data.channels)) tracker.channels.push(...data.channels);
    if (data.newest) tracker.newest = data.newest;
    if (Array.isArray(data.seen)) tracker.seen = new Set(data.seen);
  } catch {}
}
