import { NativeFunction, ArgType } from '@tryforge/forgescript';
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
      type: ArgType.Boolean;
      required: false;
      rest: false;
      default: boolean;
    },
    {
      name: string;
      description: string;
      type: ArgType.String;
      required: true;
      rest: true;
    },
  ],
  true
>;
export default _default;
//# sourceMappingURL=youtubePlaylistRemoveVideos.d.ts.map
