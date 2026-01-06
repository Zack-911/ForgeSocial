import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../..';
import { handleYoutubeError } from '../../utils/errorHandler';

export default new NativeFunction({
  name: '$youtubeGetUnseenNotificationsCount',
  description: 'Get the count of unseen YouTube notifications',
  unwrap: false,
  output: ArgType.Number,
  async execute(ctx) {
    try {
      const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
      const youtube = ext.youtube;
      if (!youtube) return this.customError('YouTube not configured or not found');
      const count = await youtube.getUnseenNotificationsCount();
      return this.success(count);
    } catch (error) {
      return this.success(handleYoutubeError(error));
    }
  },
});
