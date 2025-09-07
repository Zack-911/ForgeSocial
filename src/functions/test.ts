import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../'
export default new NativeFunction({
  name: '$test',
  version: '1.0.0',
  description: 'a test command ignore this uwu',
  unwrap: false,
  output: ArgType.Json,
  async execute(ctx) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    console.log('hello')
    try {
      ext.fireEvent('newRedditPost', {
        subreddit: 'test',
        post: {
          title: 'test',
          url: 'https://example.com',
        }
      });
      console.log('Fired')
      return this.success('Test passed');
    } catch (error) {
      return this.success(error);
    }
  },
});
