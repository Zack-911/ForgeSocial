import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare enum ReviewSort {
  CREATED = 'created',
  UPDATED = 'updated',
  CREATED_AT = 'created_at',
}
declare enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
declare const _default: NativeFunction<
  [
    {
      name: string;
      description: string;
      type: ArgType.String;
      required: true;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.String;
      required: true;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Number;
      required: true;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof ReviewSort;
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
//# sourceMappingURL=githubListPullReviews.d.ts.map
