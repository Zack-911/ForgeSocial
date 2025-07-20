import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { removeChannel } from '../../natives/pollYoutube';

export default new NativeFunction({
  name: '$unTrackYoutubeChannel',
  description: 'Stops tracking a previously tracked YouTube channel.',
  version: '1.0.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'channelId',
      description: 'The channel ID to untrack.',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [channelId]) {
    const removed = await removeChannel(channelId);
    return this.success(removed ? `true` : `false`);
  },
});
