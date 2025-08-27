import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { trackNewVideos } from '../../../natives/pollYoutube';

export default new NativeFunction({
  name: '$trackYoutubeChannel',
  description: 'Starts tracking a YouTube channel and emits events on new uploads.',
  version: '1.0.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'channelId',
      description: 'The channel ID to track (e.g. UC_x5XG1OV2P6uZZ5FSM9Ttw)',
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [channelId]) {
    await trackNewVideos(channelId);
    return this.success(true);
  },
});
