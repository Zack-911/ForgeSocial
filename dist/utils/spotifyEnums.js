"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatMode = exports.TimeRange = exports.IncludeGroups = exports.SearchType = void 0;
var SearchType;
(function (SearchType) {
    SearchType["album"] = "album";
    SearchType["artist"] = "artist";
    SearchType["playlist"] = "playlist";
    SearchType["track"] = "track";
    SearchType["show"] = "show";
    SearchType["episode"] = "episode";
    SearchType["audiobook"] = "audiobook";
})(SearchType || (exports.SearchType = SearchType = {}));
var IncludeGroups;
(function (IncludeGroups) {
    IncludeGroups["album"] = "album";
    IncludeGroups["single"] = "single";
    IncludeGroups["appears_on"] = "appears_on";
    IncludeGroups["compilation"] = "compilation";
})(IncludeGroups || (exports.IncludeGroups = IncludeGroups = {}));
var TimeRange;
(function (TimeRange) {
    TimeRange["long_term"] = "long_term";
    TimeRange["medium_term"] = "medium_term";
    TimeRange["short_term"] = "short_term";
})(TimeRange || (exports.TimeRange = TimeRange = {}));
var RepeatMode;
(function (RepeatMode) {
    RepeatMode["track"] = "track";
    RepeatMode["context"] = "context";
    RepeatMode["off"] = "off";
})(RepeatMode || (exports.RepeatMode = RepeatMode = {}));
//# sourceMappingURL=spotifyEnums.js.map