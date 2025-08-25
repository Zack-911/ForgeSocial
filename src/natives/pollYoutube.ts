/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import * as path from 'path';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

/**
 * Minimal video shape emitted to the extension.
 */
interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  url: string;
}

/**
 * Tracks state for polling YouTube channels for new videos.
 */
type YoutubeTracker = {
  seen: Set<string>;
  channels: string[];
  newest: Record<string, string | null>;
};

const tracker: YoutubeTracker = {
  seen: new Set(),
  channels: [],
  newest: {},
};

/** Per-channel cooldown so we don't hammer RSS. */
const CHANNEL_COOLDOWN_MS = 30 * 60 * 1000;
/** Spacing between channel requests within a single tick. */
const POLL_SPACING_MS = 0;
/** How often we run a pass over channels. */
const TICK_INTERVAL_MS = 15_000;

/** Guard to avoid overlapping ticks. */
let tickRunning = false;
/** Interval handle so we can avoid double-starts. */
let pollInterval: NodeJS.Timeout | null = null;

/** Last-polled timestamps per channel. */
const pollCooldowns: Record<string, number> = {};

/** Need attributes for link["@_href"] in fast-xml-parser. */
const parser = new XMLParser({ ignoreAttributes: false });

const TRACKED_FILE = path.resolve(__dirname, '../../tracked_youtube_channels.json');

/**
 * Adds a channel to the tracked set and persists it.
 */
export async function trackNewVideos(channelId: string): Promise<void> {
  if (!tracker.channels.includes(channelId)) {
    tracker.channels.push(channelId);
    tracker.newest[channelId] = null;
    await saveTrackedChannelsToFile();
  }
}

/**
 * Returns a copy of all tracked channel IDs.
 */
export function getAllTrackedChannels(): string[] {
  return [...tracker.channels];
}

/**
 * Removes a channel from tracking and persists the change.
 */
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
 * Start background polling using RSS.
 * NOTE: This function is non-async and returns immediately (no infinite await).
 *
 * @param _ext - unused placeholder to match existing call sites
 * @param onNewVideo - callback invoked whenever a new video is detected
 */
export function startPollingTrackedChannels(
  _ext: any,
  onNewVideo: (video: Record<string, unknown>) => void,
): void {
  if (pollInterval) return; // already started

  // Run once immediately to initialize newest/seen without blocking startup.
  pollTick(onNewVideo).catch(() => {
    /* swallow; next tick will retry */
  });

  // Schedule repeats.
  pollInterval = setInterval(() => {
    pollTick(onNewVideo).catch(() => {
      /* swallow; next tick will retry */
    });
  }, TICK_INTERVAL_MS);
}

/**
 * One polling pass across all channels with per-channel cooldowns.
 * Uses a running-guard to prevent overlapping executions.
 */
async function pollTick(onNewVideo: (video: Record<string, unknown>) => void): Promise<void> {
  if (tickRunning) return;
  tickRunning = true;

  try {
    const now = Date.now();

    for (const channelId of tracker.channels) {
      const lastPolled = pollCooldowns[channelId] || 0;
      if (now - lastPolled < CHANNEL_COOLDOWN_MS) continue;

      try {
        const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const { data } = await axios.get<string>(url, {
          responseType: 'text',
          timeout: 10_000,
          // You can add headers if needed to be nice to YT's servers.
        });

        const feed = parser.parse(data);
        const rawEntry = feed?.feed?.entry;
        if (!rawEntry) {
          pollCooldowns[channelId] = Date.now();
          continue;
        }

        const entries = Array.isArray(rawEntry) ? rawEntry : [rawEntry];
        const latest = entries[0];

        const videoId: string | undefined = latest?.['yt:videoId'];
        if (!videoId) {
          pollCooldowns[channelId] = Date.now();
          continue;
        }

        // First time seeing this channel: seed newest/seen but don't emit.
        if (tracker.newest[channelId] == null) {
          tracker.newest[channelId] = videoId;
          tracker.seen.add(videoId);
          await saveTrackedChannelsToFile();
        } else if (!tracker.seen.has(videoId)) {
          const video: YouTubeVideo = {
            id: videoId,
            title: String(latest?.title ?? ''),
            published: String(latest?.published ?? ''),
            url:
              (latest?.link?.['@_href'] as string | undefined) ||
              `https://www.youtube.com/watch?v=${videoId}`,
          };

          onNewVideo(video as unknown as Record<string, unknown>);

          tracker.seen.add(videoId);
          tracker.newest[channelId] = videoId;

          // Cap memory usage for the seen set.
          if (tracker.seen.size > 1000) {
            const first = tracker.seen.values().next().value;
            if (first !== undefined) tracker.seen.delete(first);
          }

          await saveTrackedChannelsToFile();
        }

        pollCooldowns[channelId] = Date.now();
      } catch {
        // Even on failure, apply cooldown to avoid tight error loops.
        pollCooldowns[channelId] = Date.now();
      }

      if (POLL_SPACING_MS > 0) {
        await new Promise((res) => setTimeout(res, POLL_SPACING_MS));
      }
    }
  } finally {
    tickRunning = false;
  }
}

/**
 * Persist tracker state to disk.
 */
export async function saveTrackedChannelsToFile(): Promise<void> {
  const data = {
    channels: tracker.channels,
    newest: tracker.newest,
    seen: Array.from(tracker.seen),
  };
  await fs.writeFile(TRACKED_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Load tracker state from disk.
 * Gracefully handles a missing file or invalid JSON by starting from empty state.
 */
export async function loadTrackedChannelsFromFile(): Promise<void> {
  try {
    const raw = await fs.readFile(TRACKED_FILE, 'utf-8');
    const data = JSON.parse(raw);

    if (Array.isArray(data?.channels)) {
      for (const ch of data.channels) if (!tracker.channels.includes(ch)) tracker.channels.push(ch);
    }

    if (data?.newest && typeof data.newest === 'object') {
      tracker.newest = { ...tracker.newest, ...data.newest };
    }

    if (Array.isArray(data?.seen)) {
      tracker.seen = new Set<string>(data.seen);
    }
  } catch (err: any) {
    // Missing file is fine; any other error -> start clean.
    if (err?.code !== 'ENOENT') {
      // Optionally log once if you have a logger available.
      // console.warn('[YouTubeTracker] Failed to load state, starting empty:', err);
    }
  }
}
