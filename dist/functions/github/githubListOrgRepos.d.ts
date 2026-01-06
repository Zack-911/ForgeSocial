import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum RepoType {
  All = 'all',
  Public = 'public',
  Private = 'private',
  Forks = 'forks',
  Sources = 'sources',
  Member = 'member',
}
declare enum SortType {
  Created = 'created',
  Updated = 'updated',
  Pushed = 'pushed',
  FullName = 'full_name',
}
declare enum DirectionType {
  Asc = 'asc',
  Desc = 'desc',
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
      required: false;
      rest: false;
      type: ArgType.Enum;
      enum: typeof RepoType;
    },
    {
      name: string;
      description: string;
      required: false;
      rest: false;
      type: ArgType.Enum;
      enum: typeof SortType;
    },
    {
      name: string;
      description: string;
      required: false;
      rest: false;
      type: ArgType.Enum;
      enum: typeof DirectionType;
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
//# sourceMappingURL=githubListOrgRepos.d.ts.map
