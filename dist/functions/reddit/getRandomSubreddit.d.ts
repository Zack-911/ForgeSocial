import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum filterType {
    popular = 0,
    new = 1
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Enum;
    rest: false;
    required: false;
    enum: typeof filterType;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: false;
    rest: false;
    default: number;
}], true>;
export default _default;
//# sourceMappingURL=getRandomSubreddit.d.ts.map