'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ForgeSocialEventHandler = void 0;
const forgescript_1 = require('@tryforge/forgescript');
const __1 = require('..');
class ForgeSocialEventHandler extends forgescript_1.BaseEventHandler {
  register(client) {
    // @ts-expect-error: No idea why eslint just said to use this
    client.getExtension(__1.ForgeSocial, true)['emitter'].on(this.name, this.listener.bind(client));
  }
}
exports.ForgeSocialEventHandler = ForgeSocialEventHandler;
//# sourceMappingURL=ForgeSocialEventHandlers.js.map
