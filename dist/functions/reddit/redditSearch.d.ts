import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum type {
  link = 0,
  comment = 1,
  sr = 2,
  user = 3,
  all = 4,
}
declare enum sort {
  new = 0,
  hot = 1,
  top = 2,
  relevance = 3,
  comments = 4,
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
      type: ArgType.Enum;
      required: false;
      rest: false;
      enum: typeof type;
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
      type: ArgType.Enum;
      required: false;
      rest: false;
      enum: typeof sort;
    },
  ],
  true
>;
export default _default;
//# sourceMappingURL=redditSearch.d.ts.map
