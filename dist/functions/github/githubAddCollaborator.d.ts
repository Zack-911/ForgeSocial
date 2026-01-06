import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum Permission {
  Pull = 'pull',
  Push = 'push',
  Admin = 'admin',
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
      type: ArgType.String;
    },
    {
      name: string;
      description: string;
      required: false;
      rest: false;
      type: ArgType.Enum;
      enum: typeof Permission;
    },
  ],
  true
>;
export default _default;
//# sourceMappingURL=githubAddCollaborator.d.ts.map
