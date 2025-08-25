"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackNewVideos = trackNewVideos;
exports.getAllTrackedChannels = getAllTrackedChannels;
exports.removeChannel = removeChannel;
exports.startPollingTrackedChannels = startPollingTrackedChannels;
exports.saveTrackedChannelsToFile = saveTrackedChannelsToFile;
exports.loadTrackedChannelsFromFile = loadTrackedChannelsFromFile;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs_1 = require("fs");
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
const fast_xml_parser_1 = require("fast-xml-parser");
const tracker = {
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
let pollInterval = null;
/** Last-polled timestamps per channel. */
const pollCooldowns = {};
/** Need attributes for link["@_href"] in fast-xml-parser. */
const parser = new fast_xml_parser_1.XMLParser({ ignoreAttributes: false });
const TRACKED_FILE = path.resolve(__dirname, '../../tracked_youtube_channels.json');
/**
 * Adds a channel to the tracked set and persists it.
 */
async function trackNewVideos(channelId) {
    if (!tracker.channels.includes(channelId)) {
        tracker.channels.push(channelId);
        tracker.newest[channelId] = null;
        await saveTrackedChannelsToFile();
    }
}
/**
 * Returns a copy of all tracked channel IDs.
 */
function getAllTrackedChannels() {
    return [...tracker.channels];
}
/**
 * Removes a channel from tracking and persists the change.
 */
async function removeChannel(channelId) {
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
function startPollingTrackedChannels(_ext, onNewVideo) {
    if (pollInterval)
        return; // already started
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
async function pollTick(onNewVideo) {
    if (tickRunning)
        return;
    tickRunning = true;
    try {
        const now = Date.now();
        for (const channelId of tracker.channels) {
            const lastPolled = pollCooldowns[channelId] || 0;
            if (now - lastPolled < CHANNEL_COOLDOWN_MS)
                continue;
            try {
                const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
                const { data } = await axios_1.default.get(url, {
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
                const videoId = latest?.['yt:videoId'];
                if (!videoId) {
                    pollCooldowns[channelId] = Date.now();
                    continue;
                }
                // First time seeing this channel: seed newest/seen but don't emit.
                if (tracker.newest[channelId] == null) {
                    tracker.newest[channelId] = videoId;
                    tracker.seen.add(videoId);
                    await saveTrackedChannelsToFile();
                }
                else if (!tracker.seen.has(videoId)) {
                    const video = {
                        id: videoId,
                        title: String(latest?.title ?? ''),
                        published: String(latest?.published ?? ''),
                        url: latest?.link?.['@_href'] ||
                            `https://www.youtube.com/watch?v=${videoId}`,
                    };
                    onNewVideo(video);
                    tracker.seen.add(videoId);
                    tracker.newest[channelId] = videoId;
                    // Cap memory usage for the seen set.
                    if (tracker.seen.size > 1000) {
                        const first = tracker.seen.values().next().value;
                        if (first !== undefined)
                            tracker.seen.delete(first);
                    }
                    await saveTrackedChannelsToFile();
                }
                pollCooldowns[channelId] = Date.now();
            }
            catch {
                // Even on failure, apply cooldown to avoid tight error loops.
                pollCooldowns[channelId] = Date.now();
            }
            if (POLL_SPACING_MS > 0) {
                await new Promise((res) => setTimeout(res, POLL_SPACING_MS));
            }
        }
    }
    finally {
        tickRunning = false;
    }
}
/**
 * Persist tracker state to disk.
 */
async function saveTrackedChannelsToFile() {
    const data = {
        channels: tracker.channels,
        newest: tracker.newest,
        seen: Array.from(tracker.seen),
    };
    await fs_1.promises.writeFile(TRACKED_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
/**
 * Load tracker state from disk.
 * Gracefully handles a missing file or invalid JSON by starting from empty state.
 */
async function loadTrackedChannelsFromFile() {
    try {
        const raw = await fs_1.promises.readFile(TRACKED_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (Array.isArray(data?.channels)) {
            for (const ch of data.channels)
                if (!tracker.channels.includes(ch))
                    tracker.channels.push(ch);
        }
        if (data?.newest && typeof data.newest === 'object') {
            tracker.newest = { ...tracker.newest, ...data.newest };
        }
        if (Array.isArray(data?.seen)) {
            tracker.seen = new Set(data.seen);
        }
    }
    catch (err) {
        // Missing file is fine; any other error -> start clean.
        if (err?.code !== 'ENOENT') {
            // Optionally log once if you have a logger available.
            // console.warn('[YouTubeTracker] Failed to load state, starting empty:', err);
        }
    }
}
//# sourceMappingURL=pollYoutube.js.map