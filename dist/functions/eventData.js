'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
exports.default = new forgescript_1.NativeFunction({
  name: '$socialEventData',
  version: '1.0.0',
  description: 'Returns event data for any forgesocial events',
  unwrap: false,
  output: forgescript_1.ArgType.Json,
  async execute(ctx) {
    const extras = ctx.runtime.extras;
    return this.success(JSON.stringify(extras, undefined, 2));
  },
});
//# sourceMappingURL=eventData.js.map
