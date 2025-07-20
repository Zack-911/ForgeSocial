"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Features = exports.SortBy = exports.Duration = exports.UploadDate = void 0;
var UploadDate;
(function (UploadDate) {
    UploadDate["All"] = "all";
    UploadDate["Hour"] = "hour";
    UploadDate["Today"] = "today";
    UploadDate["Week"] = "week";
    UploadDate["Month"] = "month";
    UploadDate["Year"] = "year";
})(UploadDate || (exports.UploadDate = UploadDate = {}));
var Duration;
(function (Duration) {
    Duration["All"] = "all";
    Duration["Short"] = "short";
    Duration["Medium"] = "medium";
    Duration["Long"] = "long";
})(Duration || (exports.Duration = Duration = {}));
var SortBy;
(function (SortBy) {
    SortBy["Relevance"] = "relevance";
    SortBy["Rating"] = "rating";
    SortBy["UploadDate"] = "upload_date";
    SortBy["ViewCount"] = "view_count";
})(SortBy || (exports.SortBy = SortBy = {}));
var Features;
(function (Features) {
    Features["HD"] = "hd";
    Features["Subtitles"] = "subtitles";
    Features["FourK"] = "4k";
    Features["Live"] = "live";
    Features["ThreeSixty"] = "360";
    Features["ThreeD"] = "3d";
    Features["HDR"] = "hdr";
    Features["CC"] = "cc";
    Features["VR180"] = "vr180";
})(Features || (exports.Features = Features = {}));
//# sourceMappingURL=youtubeEnums.js.map