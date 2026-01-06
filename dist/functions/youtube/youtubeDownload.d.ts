import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Itag, Quality, Type, Codec, Client } from '../../utils/youtubeEnums';
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
      type: ArgType.Enum;
      enum: typeof Client;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof Itag;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof Quality;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof Type;
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
      type: ArgType.String;
      required: false;
      rest: false;
    },
    {
      name: string;
      description: string;
      type: ArgType.Enum;
      enum: typeof Codec;
      required: false;
      rest: false;
    },
  ],
  true
>;
export default _default;
//# sourceMappingURL=youtubeDownload.d.ts.map
