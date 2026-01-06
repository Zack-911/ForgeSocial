<div align="center">
  <h1>ForgeSocial</h1>
  <img src="https://img.shields.io/github/stars/zack-911/forgesocial?style=social">
  <img src="https://img.shields.io/github/license/zack-911/forgesocial">
  <img src="https://img.shields.io/github/issues/zack-911/forgesocial">
  <img src="https://img.shields.io/github/issues-pr/zack-911/forgesocial">
  <img src="https://img.shields.io/discord/997899472610795580?label=chat&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-blue">
</div>

## 🔗 Quick Links

- [🔗 Quick Links](#-quick-links)
- [📖 Introduction](#-introduction)
- [✨ Features](#-features)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
  - [Environment Variables](#environment-variables)
  - [🎥 YouTube](#-youtube)
    - [🔑 How to Get YouTube Credentials](#-how-to-get-youtube-credentials)
  - [👽 Reddit](#-reddit)
    - [🔑 How to Get Reddit Credentials](#-how-to-get-reddit-credentials)
  - [🐙 GitHub](#-github)
    - [🔑 How to Get GitHub PAT](#-how-to-get-github-pat)
- [⚠️ Rate Limits](#️-rate-limits)
  - [YouTube](#youtube)
  - [Reddit](#reddit)
  - [GitHub](#github)
- [🚦 Usage Example](#-usage-example)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📖 Introduction

ForgeSocial is a powerful Node.js library that simplifies interaction with various social media platforms through a unified interface. It handles the complex authentication, rate limiting, and API interactions, allowing developers to focus on building amazing social features without worrying about the underlying complexities.

With ForgeSocial, you can:

- Monitor subreddits for new posts
- Track YouTube channels for new uploads
- Interact with GitHub repositories
- And more coming soon!

---

## ✨ Features

- **Unified API**: Single interface for multiple social platforms
- **Event-Driven**: Real-time event handling for new content
- **Easy Configuration**: Simple setup with comprehensive options
- **Rate Limit Handling**: Built-in rate limit management
- **Caching**: Optional caching to reduce API calls

---

## 🚀 Installation

```bash
npm install github:zack-911/forgesocial#main
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# Reddit
REDDIT_USERNAME=your_reddit_username
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret

# YouTube
YOUTUBE_COOKIE=your_youtube_cookie
YOUTUBE_UA=your_user_agent

# GitHub
GITHUB_TOKEN=your_github_token
```

---

### 🎥 YouTube

```javascript
youtube: {
  enabled: true,
  cookie: process.env.YOUTUBE_COOKIE,
  userAgent: process.env.YOUTUBE_UA,
  cache: true,
  log: 'NONE'
}
```

#### 🔑 How to Get YouTube Credentials

1. Open an **incognito/private browser** window.
2. Log into YouTube.
3. Open **DevTools (F12)** → **Network** tab.
4. Reload the page → click any request to `youtube.com`.
5. Copy headers:
   - `Cookie` → paste into `.env` as `YOUTUBE_COOKIE=...`
   - `User-Agent` → paste into `.env` as `YOUTUBE_UA=...`

6. Close the incognito window.
   💡 Refresh your cookie weekly to avoid expired sessions.

---

### 👽 Reddit

```javascript
reddit: {
  redditUsername: process.env.REDDIT_USERNAME,
  clientID: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
}
```

#### 🔑 How to Get Reddit Credentials

1. Log into [Reddit Apps](https://www.reddit.com/prefs/apps).
2. Scroll to **Developed Applications** → click **Create App**.
3. Fill in:
   - **Name**: Your app name (e.g., ForgeSocialTest).
   - **Type**: Select **script**.
   - **Redirect URI**: Enter `http://localhost:8080` (not actually used here).

4. Once created:
   - **Client ID** = string under app name.
   - **Client Secret** = shown as “secret”.

5. Add them to `.env`:

   ```env
   REDDIT_CLIENT_ID=your_id
   REDDIT_CLIENT_SECRET=your_secret
   REDDIT_USERNAME=your_username
   ```

---

### 🎵 Spotify

```javascript
spotify: {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}
```

#### 🔑 How to Get Spotify Credentials

1. Log into the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Click **Create An App**.
3. Fill in the name and description.
4. Once created, copy the **Client ID** and **Client Secret**.
5. Add them to `.env`:

   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

---

### 🐙 GitHub

```javascript
github: {
  token: process.env.GITHUB_TOKEN,
  log: false,
}
```

#### 🔑 How to Get GitHub PAT

1. Log into [GitHub](https://github.com).
2. Go to **Settings** → **Developer settings** → **Personal access tokens**.
3. Choose **Tokens (classic)** → **Generate new token**.
4. Select scopes:
   - `repo:public_repo` (read-only public repos).
   - Or full `repo` if you need issue/comment interactions.

5. Copy the token (GitHub only shows it once).
6. Add to `.env`:

   ```env
   GITHUB_TOKEN=your_pat_here
   ```

---

## ⚠️ Rate Limits

### YouTube

- Uses `youtubei.js` via YouTube’s private API.
- No fixed official limits, but spamming may get you blocked.
- Avoid bulk downloads and refresh cookies regularly.

### Reddit

- Unknown

### Spotify

- Rolling limit based on rolling 30-second window.
- Returns 429 Too Many Requests with `Retry-After` header (handled automatically).

### GitHub

- Authenticated: 5,000 requests/hour

---

## 🚦 Usage Example

```javascript
import { ForgeClient } from '@tryforge/forgescript';
import { ForgeSocial } from 'forgesocial';
import dotenv from 'dotenv';

dotenv.config();

const social = new ForgeSocial({
  events: ['newRedditPost', 'newYoutubeVideo'],
  spotify: {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
  youtube: {
    enabled: true,
    cookie: process.env.YOUTUBE_COOKIE,
    userAgent: process.env.YOUTUBE_UA,
    cache: true,
    log: 'NONE',
  },
  reddit: {
    redditUsername: process.env.REDDIT_USERNAME,
    clientID: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    userAgent: 'YourApp/1.0.0',
    retryLimit: 3,
    requestDelay: 1000,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    log: false,
    cache: true,
    cacheTTL: 3600,
  },
});

const client = new ForgeClient({
  extensions: [social],
  events: ['ready', 'messageCreate'],
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
  prefixes: ['.'],
});

client.login(process.env.DISCORD_TOKEN);
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md).

---

## 📄 License

This project is licensed under the GPL-3 License – see [LICENSE](LICENSE).

---

_Note: ForgeSocial will only support platforms like OnlyFans or Pornhub if Nicky, Aggy, or Berk asks for them uwu._
