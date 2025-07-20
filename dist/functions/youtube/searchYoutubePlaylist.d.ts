import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { UploadDate, Duration, SortBy, Features } from '../../utils/youtubeEnums';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    required: true;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Number;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof UploadDate;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof Duration;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof SortBy;
}, {
    name: string;
    description: string;
    required: false;
    rest: true;
    type: ArgType.Enum;
    enum: typeof Features;
}], true>;
export default _default;
//# sourceMappingURL=searchYoutubePlaylist.d.ts.map