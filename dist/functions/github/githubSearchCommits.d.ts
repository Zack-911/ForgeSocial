import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare enum SearchCommitsSort {
    AuthorDate = "author-date",
    CommitterDate = "committer-date"
}
declare enum SortOrder {
    Asc = "asc",
    Desc = "desc"
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
    enum: typeof SearchCommitsSort;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof SortOrder;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: true;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=githubSearchCommits.d.ts.map