'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.trackNewPosts = trackNewPosts;
exports.getAllTrackedSubreddits = getAllTrackedSubreddits;
exports.removeSubreddit = removeSubreddit;
exports.startPollingTrackedSubreddits = startPollingTrackedSubreddits;
exports.saveTrackedSubredditsToFile = saveTrackedSubredditsToFile;
exports.loadTrackedSubredditsFromFile = loadTrackedSubredditsFromFile;
/**
 * Provides utilities for tracking, polling, and persisting new Reddit posts from multiple subreddits.
 * Handles batching, deduplication, and persistent storage of tracked subreddits and their newest post IDs.
 */
const redditFetch_1 = require('../utils/redditFetch');
const fs_1 = require('fs');
const path = __importStar(require('path'));
const tracker = {
  seen: [],
  subreddits: [],
  groupIndex: 0,
  newest: {},
};
/**
 * Splits an array into groups of a given size.
 * @param arr - The array to split.
 * @param size - The maximum size of each group.
 * @returns Array of grouped arrays.
 */
function getGroups(arr, size) {
  const groups = [];
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size));
  }
  return groups;
}
/**
 * Adds a subreddit to the tracked pool. Does not start polling or perform any other actions.
 * @param subreddit - The subreddit to track (name only, no /r/ prefix)
 * @returns Promise<void>
 */
async function trackNewPosts(subreddit) {
  if (!tracker.subreddits.includes(subreddit)) {
    tracker.subreddits.push(subreddit);
    tracker.newest[subreddit] = null;
    await saveTrackedSubredditsToFile();
  }
}
/**
 * Returns a copy of all currently tracked subreddits.
 * @returns Array of tracked subreddit names.
 */
function getAllTrackedSubreddits() {
  return [...tracker.subreddits];
}
/**
 * Removes a subreddit from tracking and deletes its newest post ID, then updates the JSON file.
 * @param subreddit - The subreddit to remove
 * @returns Promise resolving to true if removed, false if not found
 */
async function removeSubreddit(subreddit) {
  const idx = tracker.subreddits.indexOf(subreddit);
  if (idx !== -1) {
    tracker.subreddits.splice(idx, 1);
    delete tracker.newest[subreddit];
    await saveTrackedSubredditsToFile();
    return true;
  }
  return false;
}
/**
 * Starts polling for all currently tracked subreddits without adding any new ones.
 * Calls onNewPost for each new post found.
 * @param accessToken - OAuth access token for Reddit API
 * @param redditUsername - Reddit username for API requests
 * @param onNewPost - Callback invoked with each new post object
 * @returns Promise<void>
 */
async function startPollingTrackedSubreddits(accessToken, redditUsername, onNewPost) {
  if (tracker.subreddits.length === 0) return;
  const groups = getGroups(tracker.subreddits, 25);
  async function pollGroup() {
    if (groups.length === 0) return;
    const currentGroup = groups[tracker.groupIndex % groups.length];
    tracker.groupIndex++;
    for (let i = 0; i < currentGroup.length; i += 3) {
      const subs = currentGroup.slice(i, i + 3);
      const path = `/r/${subs.join('+')}/new?limit=50`;
      try {
        const res = await (0, redditFetch_1.redditFetch)(path, accessToken, redditUsername);
        const posts = res?.data?.children || [];
        for (const sub of subs) {
          const batch = posts
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((p) => p.data)
            .filter((d) => d.subreddit.toLowerCase() === sub.toLowerCase());
          if (tracker.newest[sub] === null && batch.length) {
            tracker.newest[sub] = batch[0].id;
            batch.forEach((d) => tracker.seen.push(d.id));
            continue;
          }
          for (const p of batch) {
            if (!tracker.seen.includes(p.id)) {
              if (tracker.newest[sub] && p.id !== tracker.newest[sub]) {
                onNewPost(p);
              }
              tracker.seen.push(p.id);
              if (tracker.seen.length > 1000) tracker.seen.shift();
            }
          }
        }
      } catch (err) {
        console.error(`[TRACKER] Error polling ${subs.join(',')}:`, err);
      }
    }
  }
  setInterval(pollGroup, 15000);
}
const TRACKED_FILE = path.resolve(__dirname, '../../tracked_subreddits.json');
/**
 * Saves all tracked subreddits and their newest post IDs to a JSON file.
 * @returns Promise<void>
 */
async function saveTrackedSubredditsToFile() {
  const data = {
    subreddits: tracker.subreddits,
    newest: tracker.newest,
  };
  await fs_1.promises.writeFile(TRACKED_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
/**
 * Loads tracked subreddits and their newest post IDs from a JSON file and adds them to the tracker.
 * @returns Promise<void>
 */
async function loadTrackedSubredditsFromFile() {
  try {
    const raw = await fs_1.promises.readFile(TRACKED_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (Array.isArray(data.subreddits)) {
      for (const sub of data.subreddits) {
        if (!tracker.subreddits.includes(sub)) {
          tracker.subreddits.push(sub);
        }
      }
    }
    if (data.newest && typeof data.newest === 'object') {
      for (const [sub, id] of Object.entries(data.newest)) {
        tracker.newest[sub] = id;
      }
    }
  } catch {}
}
//# sourceMappingURL=pollSubreddit.js.map
