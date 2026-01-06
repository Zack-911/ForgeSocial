import { NativeFunction } from '@tryforge/forgescript';
import { getAllTrackedChannels } from '../../natives/pollYoutube';

export default new NativeFunction({
  name: '$listTrackedYoutubeChannels',
  description: 'Returns a list of all tracked YouTube channel IDs.',
  version: '1.0.0',
  unwrap: false,
  async execute() {
    const channels = getAllTrackedChannels();
    return this.success(channels);
  },
});
