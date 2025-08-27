import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Duration, Features, SortBy, SearchType, UploadDate } from '../../../utils/youtubeEnums';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof UploadDate;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof Duration;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof SearchType;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof SortBy;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof Features;
    required: false;
    rest: true;
}], true>;
export default _default;
//# sourceMappingURL=youtubeSearch.d.ts.map