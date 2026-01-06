import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum sort {
    new = 0,
    hot = 1,
    top = 2,
    relevance = 3,
    comments = 4
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    required: true;
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
    type: ArgType.Enum;
    enum: typeof sort;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=searchSubreddit.d.ts.map