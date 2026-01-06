import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';
import { Duration, Features, SortBy, SearchType, UploadDate } from '../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$youtubeSearch',
  description: 'Searches YouTube.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The query to search for.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'uploadDate',
      description: 'The upload date to filter by.',
      type: ArgType.Enum,
      enum: UploadDate,
      required: false,
      rest: false,
    },
    {
      name: 'duration',
      description: 'The duration to filter by.',
      type: ArgType.Enum,
      enum: Duration,
      required: false,
      rest: false,
    },
    {
      name: 'type',
      description: 'The type to filter by.',
      type: ArgType.Enum,
      enum: SearchType,
      required: false,
      rest: false,
    },
    {
      name: 'sortBy',
      description: 'The sort by to filter by.',
      type: ArgType.Enum,
      enum: SortBy,
      required: false,
      rest: false,
    },
    {
      name: 'features',
      description: 'The features to filter by.',
      type: ArgType.Enum,
      enum: Features,
      required: false,
      rest: true,
    },
  ],
  async execute(ctx, [query, uploadDate, duration, type, sortBy, features]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) {
      return this.customError('YouTube not configured not found');
    }

    try {
      const info = await youtube.search(query, {
        upload_date: uploadDate || undefined,
        duration: duration || undefined,
        type: type || undefined,
        sort_by: sortBy || undefined,
        features: features || undefined,
      });
      return this.success(JSON.stringify(info, null, 2));
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
