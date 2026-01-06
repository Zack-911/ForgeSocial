import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Client } from '../../utils/youtubeEnums';
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
    enum: typeof Client;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=youtubeGetShortsVideoInfo.d.ts.map