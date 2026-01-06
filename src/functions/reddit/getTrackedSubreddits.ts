import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { getAllTrackedSubreddits } from '../../natives/pollSubreddit';

export default new NativeFunction({
  name: '$trackSubredditsList',
  version: '1.0.0',
  description: 'Returns all active tracked subreddits',
  unwrap: false,
  output: ArgType.Json,
  async execute() {
    const rs = await getAllTrackedSubreddits();
    return this.success(rs);
  },
});
