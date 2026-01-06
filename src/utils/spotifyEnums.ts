export enum SearchType {
  album = 'album',
  artist = 'artist',
  playlist = 'playlist',
  track = 'track',
  show = 'show',
  episode = 'episode',
  audiobook = 'audiobook',
}

export enum IncludeGroups {
  album = 'album',
  single = 'single',
  appears_on = 'appears_on',
  compilation = 'compilation',
}

export enum TimeRange {
  long_term = 'long_term',
  medium_term = 'medium_term',
  short_term = 'short_term',
}

export enum RepeatMode {
  track = 'track',
  context = 'context',
  off = 'off',
}
