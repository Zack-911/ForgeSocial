import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { SortBy } from '../../utils/youtubeEnums';
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
    enum: typeof SortBy;
}], true>;
export default _default;
//# sourceMappingURL=searchYoutubeChannel.d.ts.map