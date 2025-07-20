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
const tracker = {
    seen: new Set(),
    channels: [],
    groupIndex: 0,
    newest: {},
};
// Per-channel cooldown timer (ms timestamp)
const errorCooldowns = {};
function getGroups(arr, size) {
    const groups = [];
    for (let i = 0; i < arr.length; i += size) {
        groups.push(arr.slice(i, i + size));
    }
    return groups;
}
async function trackNewVideos(channelId) {
    if (!tracker.channels.includes(channelId)) {
        tracker.channels.push(channelId);
        tracker.newest[channelId] = null;
        await saveTrackedChannelsToFile();
    }
}
function getAllTrackedChannels() {
    return [...tracker.channels];
}
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
 * Starts polling for all currently tracked channels.
 * Fetches only the latest uploads per channel.
 */
async function startPollingTrackedChannels(ext, onNewVideo, pollIntervalMs = 300_000) {
    if (tracker.channels.length === 0)
        return;
    const groups = getGroups(tracker.channels, 10);
    async function pollGroup() {
        const now = Date.now();
        const group = groups[tracker.groupIndex % groups.length];
        tracker.groupIndex++;
        for (const channelId of group) {
            if (errorCooldowns[channelId] > now)
                continue;
            try {
                const channel = await ext.youtube?.getChannel(channelId);
                function isFeedWithItems(obj) {
                    return typeof obj === 'object' && obj !== null && Array.isArray(obj.items);
                }
                const videosTab = await channel?.getVideos();
                if (!isFeedWithItems(videosTab))
                    continue;
                const latestVideos = videosTab.items.filter((item) => item?.type === 'Video');
                if (latestVideos.length === 0)
                    continue;
                // First-ever poll: seed newest + seen
                if (tracker.newest[channelId] == null) {
                    tracker.newest[channelId] = latestVideos[0].id;
                    latestVideos.forEach((v) => tracker.seen.add(v.id));
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
                            tracker.seen.delete(o);
                        }
                    }
                }
                // Update newest pointer
                tracker.newest[channelId] = latestVideos[0].id;
            }
            catch (err) {
                console.error(`[YOUTUBE POLL] Error on ${channelId}:`, err);
                errorCooldowns[channelId] = Date.now() + pollIntervalMs;
            }
        }
    }
    // Kick off polling loop
    setInterval(pollGroup, pollIntervalMs);
}
const TRACKED_FILE = path.resolve(__dirname, '../../tracked_youtube_channels.json');
async function saveTrackedChannelsToFile() {
    const data = {
        channels: tracker.channels,
        newest: tracker.newest,
        seen: Array.from(tracker.seen),
    };
    await fs_1.promises.writeFile(TRACKED_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
async function loadTrackedChannelsFromFile() {
    try {
        const raw = await fs_1.promises.readFile(TRACKED_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (Array.isArray(data.channels))
            tracker.channels.push(...data.channels);
        if (data.newest)
            tracker.newest = data.newest;
        if (Array.isArray(data.seen))
            tracker.seen = new Set(data.seen);
    }
    catch { }
}
//# sourceMappingURL=pollYoutube.js.map