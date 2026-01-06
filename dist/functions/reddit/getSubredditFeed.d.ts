import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum filterType {
  best = 0,
  popular = 1,
  new = 2,
  hot = 3,
  top = 4,
  rising = 5,
}
declare const _default: NativeFunction<
  [
    {
      name: string;
      description: string;
      type: ArgType.String;
      rest: false;
      required: true;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof filterType;
      rest: false;
      required: false;
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
//# sourceMappingURL=getSubredditFeed.d.ts.map
