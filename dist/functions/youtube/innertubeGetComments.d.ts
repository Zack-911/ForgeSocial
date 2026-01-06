import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare enum CommentsSortBy {
    NewestFirst = "NEWEST_FIRST",
    TopComments = "TOP_COMMENTS"
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
    type: ArgType.Enum;
    enum: typeof CommentsSortBy;
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
//# sourceMappingURL=innertubeGetComments.d.ts.map