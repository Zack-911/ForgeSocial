import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { EngagementType } from '../../../utils/youtubeEnums';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof EngagementType;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: true;
}], true>;
export default _default;
//# sourceMappingURL=youtubeGetAttestationChallenge.d.ts.map