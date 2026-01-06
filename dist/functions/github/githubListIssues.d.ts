import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum IssueState {
    OPEN = "open",
    CLOSED = "closed",
    ALL = "all"
}
declare enum IssueSort {
    CREATED = "created",
    UPDATED = "updated",
    COMMENTS = "comments"
}
declare enum SortDirection {
    ASC = "asc",
    DESC = "desc"
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    required: true;
    rest: false;
    type: ArgType.String;
}, {
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
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof IssueState;
    default: string;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof IssueSort;
    default: string;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof SortDirection;
    default: string;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}], true>;
export default _default;
//# sourceMappingURL=githubListIssues.d.ts.map