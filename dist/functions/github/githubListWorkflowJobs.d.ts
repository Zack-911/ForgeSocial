import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum filter {
  latest = 'latest',
  all = 'all',
}
declare const _default: NativeFunction<
  [
    {
      name: string;
      description: string;
      required: true;
      rest: false;
      type: ArgType.String;
    },
    {
      name: string;
      description: string;
      required: true;
      rest: false;
      type: ArgType.String;
    },
    {
      name: string;
      description: string;
      required: true;
      rest: false;
      type: ArgType.Number;
    },
    {
      name: string;
      description: string;
      required: false;
      rest: false;
      type: ArgType.Enum;
      enum: typeof filter;
    },
    {
      name: string;
      description: string;
      required: false;
      rest: false;
      type: ArgType.Number;
    },
    {
      name: string;
      description: string;
      required: false;
      rest: false;
      type: ArgType.Number;
    },
  ],
  true
>;
export default _default;
//# sourceMappingURL=githubListWorkflowJobs.d.ts.map
