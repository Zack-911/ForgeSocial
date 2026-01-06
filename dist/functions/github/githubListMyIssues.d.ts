import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare enum IssueState {
  Open = 'open',
  Closed = 'closed',
  All = 'all',
}
declare enum IssueFilter {
  Assigned = 'assigned',
  Created = 'created',
  Mentioned = 'mentioned',
  Subscribed = 'subscribed',
  All = 'all',
}
declare enum IssueSort {
  Created = 'created',
  Updated = 'updated',
  Comments = 'comments',
}
declare enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}
declare const _default: NativeFunction<
  [
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof IssueFilter;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof IssueState;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.String;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof IssueSort;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof SortDirection;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.String;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Number;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Number;
      required: false;
      rest: false;
    },
  ],
  true
>;
export default _default;
//# sourceMappingURL=githubListMyIssues.d.ts.map
