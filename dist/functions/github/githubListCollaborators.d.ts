import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum Affiliation {
  Outside = 'outside',
  Direct = 'direct',
  All = 'all',
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
      required: false;
      rest: false;
      type: ArgType.Enum;
      enum: typeof Affiliation;
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
//# sourceMappingURL=githubListCollaborators.d.ts.map
