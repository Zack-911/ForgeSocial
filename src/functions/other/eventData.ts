import { NativeFunction, ArgType } from '@tryforge/forgescript';

export default new NativeFunction({
  name: '$socialEventData',
  version: '1.0.0',
  description: 'Returns event data for any forgesocial events',
  unwrap: false,
  output: ArgType.Json,
  async execute(ctx) {
    const extras = ctx.runtime.extras;
    return this.success(JSON.stringify(extras, undefined, 2));
  },
});
