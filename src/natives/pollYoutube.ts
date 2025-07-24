/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import * as path from 'path';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

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

// RSS polling cooldown state
const pollCooldowns: Record<string, number> = {};
const parser = new XMLParser();

const POLL_SPACING_MS = 0; // For dev use — instant loop
const CHANNEL_COOLDOWN_MS = 30 * 60 * 1000;

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
 * Starts sequential polling using RSS.
 */
export async function startPollingTrackedChannels(
  _ext: any,
  onNewVideo: (video: Record<string, unknown>) => void
): Promise<void> {
  async function pollLoop(): Promise<void> {
    while (true) {
      const now = Date.now();

      for (const channelId of tracker.channels) {
        const lastPolled = pollCooldowns[channelId] || 0;
        if (now - lastPolled < CHANNEL_COOLDOWN_MS) continue;

        try {
          const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
          const { data } = await axios.get<string>(url, { responseType: 'text' });

          const feed = parser.parse(data);
          const rawEntry = feed.feed?.entry;
          if (!rawEntry) continue;

          const entries = Array.isArray(rawEntry) ? rawEntry : [rawEntry];

          const latest = entries[0];
          const videoId = latest['yt:videoId'];

          if (tracker.newest[channelId] == null) {
            tracker.newest[channelId] = videoId;
            tracker.seen.add(videoId);
            await saveTrackedChannelsToFile();
          } else if (!tracker.seen.has(videoId)) {
            const video = {
              id: videoId,
              title: latest.title,
              published: latest.published,
              url: latest.link?.['@_href'] || `https://www.youtube.com/watch?v=${videoId}`,
            };

            onNewVideo(video);
            tracker.seen.add(videoId);
            tracker.newest[channelId] = videoId;

            // Cap memory usage
            if (tracker.seen.size > 1000) {
              const first = tracker.seen.values().next().value;
              if (first !== undefined) tracker.seen.delete(first);
            }

            await saveTrackedChannelsToFile(); // ✅ Save new state after update
          }

          pollCooldowns[channelId] = Date.now();
        } catch (err) {
          pollCooldowns[channelId] = Date.now(); // apply cooldown even on failure
        }

        await new Promise(res => setTimeout(res, POLL_SPACING_MS));
      }
    }
  }

  pollLoop();
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
