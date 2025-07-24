# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](///compare/v1.3.0...v1.4.0) (2025-07-24)


### Features

* add $extractVideoID command to extract YouTube video IDs from URLs or strings f977d37
* add $getChannelInfo command to retrieve information about a YouTube channel by ID or handle cc1bcd9
* add $getYoutubeVideo command to retrieve detailed information about a YouTube video, including comments and statistics ac7c17e
* add $searchYoutubeChannel command to enable searching for YouTube channels and returning results in JSON format be291a2
* add $searchYoutubeMusic command to enable searching for YouTube Music and returning results in JSON format 64f5a1b
* add $searchYoutubePlaylist command to enable searching for YouTube playlists with various filters 699c1e0
* add commands for tracking and managing YouTube channels, including $trackYoutubeChannel and $unTrackYoutubeChannel ec894a5
* add new event handlers for YouTube subscriber and video uploads b955774
* add polling 454ddfb
* integrate YouTube channel polling and enhance ForgeSocial options for improved event handling 6aaa683
* update ForgeSocial to handle new YouTube video events and add corresponding command 8bc5641


### Bug Fixes

* added some bugs 02dadf9
* i lied in the command description ca9592a
* update $searchYoutube command to improve error handling and response structure a349504


### Chores

* add music tracks to video info fcd7e66
* balls a37b1b4
* fix extras name in newRedditPost event 1e921ba
* update .gitignore and CI workflow to include metadata and support dev branch 2208fb7
* update CI workflow to add write permissions for contents 0aa8c74

## [1.3.0](///compare/v1.2.0...v1.3.0) (2025-07-20)


### Features

* add $searchYoutube command for enhanced YouTube video search functionality c1a8930
* integrate youtubei.js for enhanced video functionality 2bdc733


### Chores

* add GitHub Actions workflows for formatting, linting, and security checks 569aaef
* add Prettier and ESLint configuration files for code formatting and linting 717a756
* Create youtube related enums d58c846

## [1.2.0](///compare/v1.1.0...v1.2.0) (2025-07-19)

### Features

- Add new event for new Reddit posts cccfc8e
- added jsDocs, polling support and a bunch more 1527349
- Implement functions for tracking and managing Reddit subreddits fb6f484
- new event support 8125080

### Bug Fixes

- replace pnpm with npm so github actions work 5e22d9c

### Tests

- Add new command for handling new Reddit posts and update client configuration 4391cc6

### Chores

- Enhance redditFetch utility with comprehensive error handling, rate limit management, and detailed documentation 072f9bb
- mostly organisations 5c3f05f

## [1.1.0](///compare/v1.0.3...v1.1.0) (2025-07-18)

### Features

- Refactor Reddit API calls to utilize access token for authentication and update related functions f5cdbbe
- Update Reddit API calls to include access token for authentication 58acd23

### [1.0.3](///compare/v1.0.2...v1.0.3) (2025-07-18)

### Features

- add ratelimit handling be4efa2
- Create function getWiki 8526ae6
- Create function getWikiPages 9898be6
- Create function getWikiRevisions 1df0f8b

### Chores

- add build and docgen job f8d5e64

### [1.0.2](///compare/v1.0.1...v1.0.2) (2025-07-18)

### Chores

- add dist folder a1339f9

### 1.0.1 (2025-07-18)

### Features

- create error.ts in events febfcd5
- create fetch utils 5beb3cf
- create structures files and folders ee55a2d
- create subreddit related functions 4400754
- create user related functions c5371dd
- init 1b9f190

### Chores

- Create readme and license.md 4cd19ee

### Tests

- create tests files 6c74552

### Documentation

- create outputs in tests files 48f3553
