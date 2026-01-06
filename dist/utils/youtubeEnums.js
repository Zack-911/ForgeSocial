'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EngagementType =
  exports.Codec =
  exports.Quality =
  exports.Itag =
  exports.Client =
  exports.Features =
  exports.SortBy =
  exports.Duration =
  exports.Type =
  exports.SearchType =
  exports.UploadDate =
    void 0;
var UploadDate;
(function (UploadDate) {
  UploadDate['All'] = 'all';
  UploadDate['Hour'] = 'hour';
  UploadDate['Today'] = 'today';
  UploadDate['Week'] = 'week';
  UploadDate['Month'] = 'month';
  UploadDate['Year'] = 'year';
})(UploadDate || (exports.UploadDate = UploadDate = {}));
var SearchType;
(function (SearchType) {
  SearchType['Video'] = 'video';
  SearchType['Channel'] = 'channel';
  SearchType['Playlist'] = 'playlist';
  SearchType['Movie'] = 'movie';
  SearchType['All'] = 'all';
})(SearchType || (exports.SearchType = SearchType = {}));
var Type;
(function (Type) {
  Type['Video'] = 'video';
  Type['Audio'] = 'audio';
  Type['VideoAudio'] = 'video+audio';
})(Type || (exports.Type = Type = {}));
var Duration;
(function (Duration) {
  Duration['All'] = 'all';
  Duration['Short'] = 'short';
  Duration['Medium'] = 'medium';
  Duration['Long'] = 'long';
})(Duration || (exports.Duration = Duration = {}));
var SortBy;
(function (SortBy) {
  SortBy['Relevance'] = 'relevance';
  SortBy['Rating'] = 'rating';
  SortBy['UploadDate'] = 'upload_date';
  SortBy['ViewCount'] = 'view_count';
})(SortBy || (exports.SortBy = SortBy = {}));
var Features;
(function (Features) {
  Features['HD'] = 'hd';
  Features['Subtitles'] = 'subtitles';
  Features['FourK'] = '4k';
  Features['Live'] = 'live';
  Features['ThreeSixty'] = '360';
  Features['ThreeD'] = '3d';
  Features['HDR'] = 'hdr';
  Features['CreativeCommons'] = 'creative_commons';
  Features['VR180'] = 'vr180';
})(Features || (exports.Features = Features = {}));
var Client;
(function (Client) {
  Client['IOS'] = 'IOS';
  Client['Web'] = 'WEB';
  Client['MWEB'] = 'MWEB';
  Client['ANDROID'] = 'ANDROID';
  Client['YTMUSIC'] = 'YTMUSIC';
  Client['YTMUSIC_ANDROID'] = 'YTMUSIC_ANDROID';
  Client['YTSTUDIO_ANDROID'] = 'YTSTUDIO_ANDROID';
  Client['TV'] = 'TV';
  Client['TV_SIMPLY'] = 'TV_SIMPLY';
  Client['TV_EMBEDDED'] = 'TV_EMBEDDED';
  Client['YTKIDS'] = 'YTKIDS';
  Client['WEB_EMBEDDED'] = 'WEB_EMBEDDED';
  Client['WEB_CREATOR'] = 'WEB_CREATOR';
})(Client || (exports.Client = Client = {}));
var Itag;
(function (Itag) {
  Itag[(Itag['FLV_240p'] = 5)] = 'FLV_240p';
  Itag[(Itag['FLV_270p'] = 6)] = 'FLV_270p';
  Itag[(Itag['_3GP_144p'] = 17)] = '_3GP_144p';
  Itag[(Itag['MP4_360p'] = 18)] = 'MP4_360p';
  Itag[(Itag['MP4_720p'] = 22)] = 'MP4_720p';
  Itag[(Itag['FLV_360p'] = 34)] = 'FLV_360p';
  Itag[(Itag['FLV_480p'] = 35)] = 'FLV_480p';
  Itag[(Itag['_3GP_180p'] = 36)] = '_3GP_180p';
  Itag[(Itag['MP4_1080p'] = 37)] = 'MP4_1080p';
  Itag[(Itag['MP4_3072p'] = 38)] = 'MP4_3072p';
  Itag[(Itag['WebM_360p'] = 43)] = 'WebM_360p';
  Itag[(Itag['WebM_480p'] = 44)] = 'WebM_480p';
  Itag[(Itag['WebM_720p'] = 45)] = 'WebM_720p';
  Itag[(Itag['WebM_1080p'] = 46)] = 'WebM_1080p';
  Itag[(Itag['MP4_360p_3D'] = 82)] = 'MP4_360p_3D';
  Itag[(Itag['MP4_480p_3D'] = 83)] = 'MP4_480p_3D';
  Itag[(Itag['MP4_720p_3D'] = 84)] = 'MP4_720p_3D';
  Itag[(Itag['MP4_1080p_3D'] = 85)] = 'MP4_1080p_3D';
  Itag[(Itag['HLS_240p_3D'] = 92)] = 'HLS_240p_3D';
  Itag[(Itag['HLS_360p_3D'] = 93)] = 'HLS_360p_3D';
  Itag[(Itag['HLS_480p_3D'] = 94)] = 'HLS_480p_3D';
  Itag[(Itag['HLS_720p_3D'] = 95)] = 'HLS_720p_3D';
  Itag[(Itag['HLS_1080p'] = 96)] = 'HLS_1080p';
  Itag[(Itag['WebM_360p_3D'] = 100)] = 'WebM_360p_3D';
  Itag[(Itag['WebM_480p_3D'] = 101)] = 'WebM_480p_3D';
  Itag[(Itag['WebM_720p_3D'] = 102)] = 'WebM_720p_3D';
  Itag[(Itag['MP4_240p'] = 132)] = 'MP4_240p';
  Itag[(Itag['MP4_240p_2'] = 133)] = 'MP4_240p_2';
  Itag[(Itag['MP4_360p_2'] = 134)] = 'MP4_360p_2';
  Itag[(Itag['MP4_480p_2'] = 135)] = 'MP4_480p_2';
  Itag[(Itag['MP4_720p_2'] = 136)] = 'MP4_720p_2';
  Itag[(Itag['MP4_1080p_2'] = 137)] = 'MP4_1080p_2';
  Itag[(Itag['MP4_2160p60'] = 138)] = 'MP4_2160p60';
  Itag[(Itag['M4A_48kbps'] = 139)] = 'M4A_48kbps';
  Itag[(Itag['M4A_128kbps'] = 140)] = 'M4A_128kbps';
  Itag[(Itag['M4A_256kbps'] = 141)] = 'M4A_256kbps';
  Itag[(Itag['HLS_72p'] = 151)] = 'HLS_72p';
  Itag[(Itag['MP4_144p'] = 160)] = 'MP4_144p';
  Itag[(Itag['WebM_360p_2'] = 167)] = 'WebM_360p_2';
  Itag[(Itag['WebM_480p_2'] = 168)] = 'WebM_480p_2';
  Itag[(Itag['WebM_1080p_2'] = 169)] = 'WebM_1080p_2';
  Itag[(Itag['WebM_Opus128'] = 171)] = 'WebM_Opus128';
  Itag[(Itag['WebM_480p_3'] = 218)] = 'WebM_480p_3';
  Itag[(Itag['WebM_144p_3'] = 219)] = 'WebM_144p_3';
  Itag[(Itag['WebM_240p'] = 242)] = 'WebM_240p';
  Itag[(Itag['WebM_360p_3'] = 243)] = 'WebM_360p_3';
  Itag[(Itag['WebM_480p_4'] = 244)] = 'WebM_480p_4';
  Itag[(Itag['WebM_480p_5'] = 245)] = 'WebM_480p_5';
  Itag[(Itag['WebM_480p_6'] = 246)] = 'WebM_480p_6';
  Itag[(Itag['WebM_720p_2'] = 247)] = 'WebM_720p_2';
  Itag[(Itag['WebM_1080p_3'] = 248)] = 'WebM_1080p_3';
  Itag[(Itag['WebM_Opus50'] = 249)] = 'WebM_Opus50';
  Itag[(Itag['WebM_Opus70'] = 250)] = 'WebM_Opus70';
  Itag[(Itag['WebM_Opus160'] = 251)] = 'WebM_Opus160';
  Itag[(Itag['MP4_1440p'] = 264)] = 'MP4_1440p';
  Itag[(Itag['MP4_2160p60_2'] = 266)] = 'MP4_2160p60_2';
  Itag[(Itag['WebM_1440p_2'] = 271)] = 'WebM_1440p_2';
  Itag[(Itag['WebM_4320p'] = 272)] = 'WebM_4320p';
  Itag[(Itag['WebM_144p_4'] = 278)] = 'WebM_144p_4';
  Itag[(Itag['MP4_720p60'] = 298)] = 'MP4_720p60';
  Itag[(Itag['MP4_1080p60'] = 299)] = 'MP4_1080p60';
  Itag[(Itag['WebM_720p60_2'] = 302)] = 'WebM_720p60_2';
  Itag[(Itag['WebM_1080p60_2'] = 303)] = 'WebM_1080p60_2';
  Itag[(Itag['WebM_1440p60'] = 308)] = 'WebM_1440p60';
  Itag[(Itag['WebM_2160p'] = 313)] = 'WebM_2160p';
  Itag[(Itag['WebM_2160p60_2'] = 315)] = 'WebM_2160p60_2';
  Itag[(Itag['WebM_144p60_HDR'] = 330)] = 'WebM_144p60_HDR';
  Itag[(Itag['WebM_240p60_HDR'] = 331)] = 'WebM_240p60_HDR';
  Itag[(Itag['WebM_360p60_HDR'] = 332)] = 'WebM_360p60_HDR';
  Itag[(Itag['WebM_480p60_HDR'] = 333)] = 'WebM_480p60_HDR';
  Itag[(Itag['WebM_720p60_HDR'] = 334)] = 'WebM_720p60_HDR';
  Itag[(Itag['WebM_1080p60_HDR'] = 335)] = 'WebM_1080p60_HDR';
  Itag[(Itag['WebM_1440p60_HDR'] = 336)] = 'WebM_1440p60_HDR';
  Itag[(Itag['WebM_2160p60_HDR'] = 337)] = 'WebM_2160p60_HDR';
})(Itag || (exports.Itag = Itag = {}));
var Quality;
(function (Quality) {
  Quality['P144'] = '144p';
  Quality['P240'] = '240p';
  Quality['P360'] = '360p';
  Quality['P480'] = '480p';
  Quality['P720'] = '720p';
  Quality['P1080'] = '1080p';
  Quality['P1440'] = '1440p';
  Quality['P2160'] = '2160p';
  Quality['P4320'] = '4320p';
  Quality['Best'] = 'best';
  Quality['BestEfficiency'] = 'bestefficiency';
})(Quality || (exports.Quality = Quality = {}));
var Codec;
(function (Codec) {
  Codec['AVC'] = 'avc';
  Codec['VP9'] = 'vp9';
  Codec['AV1'] = 'av01';
  Codec['OPUS'] = 'opus';
  Codec['MP4A'] = 'mp4a';
  Codec['H264'] = 'h264';
  Codec['VP8'] = 'vp8';
})(Codec || (exports.Codec = Codec = {}));
var EngagementType;
(function (EngagementType) {
  EngagementType['EngagementTypeUnbound'] = 'ENGAGEMENT_TYPE_UNBOUND';
  EngagementType['EngagementTypeVideoLike'] = 'ENGAGEMENT_TYPE_VIDEO_LIKE';
  EngagementType['EngagementTypeVideoDislike'] = 'ENGAGEMENT_TYPE_VIDEO_DISLIKE';
  EngagementType['EngagementTypeSubscribe'] = 'ENGAGEMENT_TYPE_SUBSCRIBE';
  EngagementType['EngagementTypePlayback'] = 'ENGAGEMENT_TYPE_PLAYBACK';
  EngagementType['EngagementTypeYpcGetPremiumPage'] = 'ENGAGEMENT_TYPE_YPC_GET_PREMIUM_PAGE';
  EngagementType['EngagementTypeYpcGetDownloadAction'] = 'ENGAGEMENT_TYPE_YPC_GET_DOWNLOAD_ACTION';
})(EngagementType || (exports.EngagementType = EngagementType = {}));
//# sourceMappingURL=youtubeEnums.js.map
