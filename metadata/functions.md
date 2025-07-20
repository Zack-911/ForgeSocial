# Functions

## $socialEventData

- **Version:** 1.0.0
- **Description:** Returns event data for any forgesocial events
- **Output:** Json
- **Unwrap:** false

## $searchReddit

- **Version:** 1.0.0
- **Description:** Search Reddit for posts, comments, users, or subreddits
- **Category:** reddit
- **Arguments:**
  -  query (String, required) - The search query string
  -  type (Enum): [link, comment, sr, user, all] - Type of result to return: link, comment, sr, user, or all
  -  limit (Number) - Maximum number of results (default: 25)
  -  sort (Enum): [new, hot, top, relevance, comments] - Sorting method (relevance, hot, new, top, comments)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getRandomSubreddit

- **Version:** 1.0.0
- **Description:** Get Random Subreddits info
- **Category:** subreddit
- **Arguments:**
  -  filter (Enum): [popular, new] - Filter subreddit list by 'popular' or 'new'
  -  limit (Number) - Maximum number of subreddits to return (max 25)
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $getSubreddit

- **Version:** 1.0.0
- **Description:** Get the subreddit about page of the name you gave
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required, rest) - The subreddit to get the about page of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getSubredditFeed

- **Version:** 1.0.0
- **Description:** Get the readable subreddit feed (title, author, upvotes, etc)
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the feed of
  -  filter (Enum): [best, popular, new, hot, top, rising] - Filter the posts by what you want bbg
  -  limit (Number) - Maximum number of posts to return (max 25)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getSubredditRules

- **Version:** 1.0.0
- **Description:** Get the rules for a subreddit
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the rules for
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackSubredditsList

- **Version:** 1.0.0
- **Description:** Returns all active tracked subreddits
- **Category:** subreddit
- **Output:** Json
- **Unwrap:** false

## $removeTrackedSubreddit

- **Version:** 1.0.0
- **Description:** Returns removes subreddit from tracking
- **Category:** subreddit
- **Arguments:**
  -  name (String, required) - subreddit name
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchSubredditPosts

- **Version:** 1.0.0
- **Description:** Search for posts within a specific subreddit
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to search in
  -  query (String, required) - The search query string
  -  limit (Number) - Maximum number of results (default: 25)
  -  sort (Enum): [new, hot, top, relevance, comments] - Sorting method (relevance, hot, new, top, comments)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackSubreddit

- **Version:** 1.0.0
- **Description:** Track subreddits new posts
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to track
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUser

- **Version:** 1.0.0
- **Description:** Get the users info about page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the info of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserActivity

- **Version:** 1.0.0
- **Description:** Get the users activity page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the activity of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserComments

- **Version:** 1.0.0
- **Description:** Get the users comments page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the comments of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserOverview

- **Version:** 1.0.0
- **Description:** Get the users overview
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the overview of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserSubmissions

- **Version:** 1.0.0
- **Description:** Get the users submissions page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the submissions of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserTrophies

- **Version:** 1.0.0
- **Description:** Get the users trophies
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the trophies of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWiki

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki index page of the name you gave
- **Category:** wiki
- **Arguments:**
  -  subreddit (String, required, rest) - The subreddit to get the wiki index page of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWikiPage

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki page. 
- **Category:** wiki
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the wiki pages of
  -  page (String) - The page name to get
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWikiRevisions

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki page revisions. Returns all revisions if page not specified. 
- **Category:** wiki
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the wiki revisions of
  -  page (String) - The page name to get the revisions of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $extractVideoID

- **Version:** 1.0.0
- **Description:** Extracts a YouTube video ID from a URL or string.
- **Category:** youtube
- **Arguments:**
  -  input (String, required) - YouTube URL or video ID
- **Output:** String
- **Brackets:** true
- **Unwrap:** true

## $getYoutubeChannel

- **Version:** 1.0.0
- **Description:** Gets info about a YouTube channel by ID or handle.
- **Category:** youtube
- **Arguments:**
  -  identifier (String, required) - Channel ID or handle (e.g. UC... or @username)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $listTrackedYoutubeChannels

- **Version:** 1.0.0
- **Description:** Returns a list of all tracked YouTube channel IDs.
- **Category:** youtube
- **Unwrap:** false

## $searchYoutube

- **Version:** 1.3.0
- **Description:** Searches YouTube and returns the top videos in JSON format. Supports filters.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - The search query to look up on YouTube
  -  limit (Number) - Maximum number of videos to return (default 5, max 25)
  -  uploadDate (Enum): [All, Hour, Today, Week, Month, Year] - Upload date filter
  -  duration (Enum): [All, Short, Medium, Long] - Video duration filter
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - Sort results by
  -  features (Enum, rest): [HD, Subtitles, FourK, Live, ThreeSixty, ThreeD, HDR, CC, VR180] - Features to filter by
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchYoutubeChannel

- **Version:** 1.3.0
- **Description:** Searches YouTube and returns matching channels in JSON format.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - Search query for YouTube channels
  -  limit (Number) - Maximum number of channels to return (default 5, max 25)
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - Sort results by (optional)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchYoutubeMusic

- **Version:** 1.3.0
- **Description:** Searches YouTube Music and returns songs in JSON format.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - Search query for music
  -  limit (Number) - Max number of songs to return (default 5, max 25)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchYoutubePlaylist

- **Version:** 1.3.0
- **Description:** Searches YouTube and returns the playlists in JSON format. Supports filters.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - The search query to look up on YouTube
  -  limit (Number) - Maximum number of playlists to return (default 5, max 25)
  -  uploadDate (Enum): [All, Hour, Today, Week, Month, Year] - Upload date filter
  -  duration (Enum): [All, Short, Medium, Long] - Video duration filter
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - Sort results by
  -  features (Enum, rest): [HD, Subtitles, FourK, Live, ThreeSixty, ThreeD, HDR, CC, VR180] - Features to filter by
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackYoutubeChannel

- **Version:** 1.0.0
- **Description:** Starts tracking a YouTube channel and emits events on new uploads.
- **Category:** youtube
- **Arguments:**
  -  channelId (String, required) - The channel ID to track (e.g. UC_x5XG1OV2P6uZZ5FSM9Ttw)
- **Brackets:** true
- **Unwrap:** true

## $unTrackYoutubeChannel

- **Version:** 1.0.0
- **Description:** Stops tracking a previously tracked YouTube channel.
- **Category:** youtube
- **Arguments:**
  -  channelId (String, required) - The channel ID to untrack.
- **Brackets:** true
- **Unwrap:** true

## $getYoutubeVideo

- **Version:** 1.3.0
- **Description:** Returns the youtube videos info.
- **Category:** youtube
- **Arguments:**
  -  ID (String, required) - The video ID to get info about
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

