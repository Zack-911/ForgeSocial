/**
 * Provides utilities for tracking, polling, and persisting new Reddit posts from multiple subreddits.
 * Handles batching, deduplication, and persistent storage of tracked subreddits and their newest post IDs.
 */
import { redditFetch } from "../utils/redditFetch"
import { promises as fs } from "fs"
import * as path from "path"

/**
 * Tracks state for polling subreddits for new posts.
 * @property seen - List of post IDs already seen.
 * @property subreddits - List of subreddits being tracked.
 * @property groupIndex - Index for round-robin batching.
 * @property newest - Map of subreddit to newest post ID seen.
 */
type Tracker = {
  seen: string[]
  subreddits: string[]
  groupIndex: number
  newest: Record<string, string | null>
}

const tracker: Tracker = {
  seen: [],
  subreddits: [],
  groupIndex: 0,
  newest: {}
}

/**
 * Splits an array into groups of a given size.
 * @param arr - The array to split.
 * @param size - The maximum size of each group.
 * @returns Array of grouped arrays.
 */
function getGroups(arr: string[], size: number): string[][] {
  const groups: string[][] = []
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size))
  }
  return groups
}

/**
 * Adds a subreddit to the tracked pool. Does not start polling or perform any other actions.
 * @param subreddit - The subreddit to track (name only, no /r/ prefix)
 * @returns Promise<void>
 */
export async function trackNewPosts(subreddit: string): Promise<void> {
  if (!tracker.subreddits.includes(subreddit)) {
    tracker.subreddits.push(subreddit)
    tracker.newest[subreddit] = null
    await saveTrackedSubredditsToFile()
  }
}

/**
 * Returns a copy of all currently tracked subreddits.
 * @returns Array of tracked subreddit names.
 */
export function getAllTrackedSubreddits(): string[] {
  return [...tracker.subreddits]
}

/**
 * Removes a subreddit from tracking and deletes its newest post ID, then updates the JSON file.
 * @param subreddit - The subreddit to remove
 * @returns Promise resolving to true if removed, false if not found
 */
export async function removeSubreddit(subreddit: string): Promise<boolean> {
  const idx = tracker.subreddits.indexOf(subreddit)
  if (idx !== -1) {
    tracker.subreddits.splice(idx, 1)
    delete tracker.newest[subreddit]
    await saveTrackedSubredditsToFile()
    return true
  }
  return false
}

/**
 * Starts polling for all currently tracked subreddits without adding any new ones.
 * Calls onNewPost for each new post found.
 * @param accessToken - OAuth access token for Reddit API
 * @param redditUsername - Reddit username for API requests
 * @param onNewPost - Callback invoked with each new post object
 * @returns Promise<void>
 */
export async function startPollingTrackedSubreddits(
  accessToken: string,
  redditUsername: string,
  onNewPost: (post: any) => void
): Promise<void> {
  if (tracker.subreddits.length === 0) return

  const groups = getGroups(tracker.subreddits, 25)

  async function pollGroup() {
    if (groups.length === 0) return

    const currentGroup = groups[tracker.groupIndex % groups.length]
    tracker.groupIndex++

    for (let i = 0; i < currentGroup.length; i += 3) {
      const subs = currentGroup.slice(i, i + 3)
      const path = `/r/${subs.join("+")}/new?limit=50`

      try {
        const res = await redditFetch(path, accessToken, redditUsername)
        const posts = res?.data?.children || []

        for (const sub of subs) {
          const batch = posts
            .map((p: any) => p.data)
            .filter((d: { subreddit: string }) => d.subreddit.toLowerCase() === sub.toLowerCase())

          if (tracker.newest[sub] === null && batch.length) {
            tracker.newest[sub] = batch[0].id
            batch.forEach((d: { id: string }) => tracker.seen.push(d.id))
            continue
          }

          for (const p of batch) {
            if (!tracker.seen.includes(p.id)) {
              if (tracker.newest[sub] && p.id !== tracker.newest[sub]) {
                onNewPost(p)
              }
              tracker.seen.push(p.id)
              if (tracker.seen.length > 1000) tracker.seen.shift()
            }
          }
        }
      } catch (err) {
        console.error(`[TRACKER] Error polling ${subs.join(",")}:`, err)
      }
    }
  }

  setInterval(pollGroup, 15000)
}

const TRACKED_FILE = path.resolve(__dirname, "../../tracked_subreddits.json")

/**
 * Saves all tracked subreddits and their newest post IDs to a JSON file.
 * @returns Promise<void>
 */
export async function saveTrackedSubredditsToFile(): Promise<void> {
  const data = {
    subreddits: tracker.subreddits,
    newest: tracker.newest
  }
  await fs.writeFile(TRACKED_FILE, JSON.stringify(data, null, 2), "utf-8")
}

/**
 * Loads tracked subreddits and their newest post IDs from a JSON file and adds them to the tracker.
 * @returns Promise<void>
 */
export async function loadTrackedSubredditsFromFile(): Promise<void> {
  try {
    const raw = await fs.readFile(TRACKED_FILE, "utf-8")
    const data = JSON.parse(raw)
    if (Array.isArray(data.subreddits)) {
      for (const sub of data.subreddits) {
        if (!tracker.subreddits.includes(sub)) {
          tracker.subreddits.push(sub)
        }
      }
    }
    if (data.newest && typeof data.newest === "object") {
      for (const [sub, id] of Object.entries(data.newest)) {
        tracker.newest[sub] = id as string | null
      }
    }
  } catch {}
}
