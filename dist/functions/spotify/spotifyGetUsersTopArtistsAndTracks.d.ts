import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { TimeRange } from '../../utils/spotifyEnums';
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
    enum: typeof TimeRange;
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
}], true>;
export default _default;
//# sourceMappingURL=spotifyGetUsersTopArtistsAndTracks.d.ts.map