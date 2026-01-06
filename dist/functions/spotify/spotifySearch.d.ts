import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { SearchType } from '../../utils/spotifyEnums';
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
    enum: typeof SearchType;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=spotifySearch.d.ts.map