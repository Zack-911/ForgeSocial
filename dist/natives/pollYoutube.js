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
// RSS polling cooldown state
const pollCooldowns = {};
const parser = new fast_xml_parser_1.XMLParser();
const POLL_SPACING_MS = 0; // For dev use — instant loop
const CHANNEL_COOLDOWN_MS = 30 * 60 * 1000;
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
 * Starts sequential polling using RSS.
 */
async function startPollingTrackedChannels(_ext, onNewVideo) {
    async function pollLoop() {
        while (true) {
            const now = Date.now();
            for (const channelId of tracker.channels) {
                const lastPolled = pollCooldowns[channelId] || 0;
                if (now - lastPolled < CHANNEL_COOLDOWN_MS)
                    continue;
                try {
                    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
                    const { data } = await axios_1.default.get(url, { responseType: 'text' });
                    const feed = parser.parse(data);
                    const rawEntry = feed.feed?.entry;
                    if (!rawEntry)
                        continue;
                    const entries = Array.isArray(rawEntry) ? rawEntry : [rawEntry];
                    const latest = entries[0];
                    const videoId = latest['yt:videoId'];
                    if (tracker.newest[channelId] == null) {
                        tracker.newest[channelId] = videoId;
                        tracker.seen.add(videoId);
                        await saveTrackedChannelsToFile();
                    }
                    else if (!tracker.seen.has(videoId)) {
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
                            if (first !== undefined)
                                tracker.seen.delete(first);
                        }
                        await saveTrackedChannelsToFile(); // ✅ Save new state after update
                    }
                    pollCooldowns[channelId] = Date.now();
                }
                catch (err) {
                    pollCooldowns[channelId] = Date.now(); // apply cooldown even on failure
                }
                await new Promise(res => setTimeout(res, POLL_SPACING_MS));
            }
        }
    }
    pollLoop();
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