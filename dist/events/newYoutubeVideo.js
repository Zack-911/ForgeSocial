'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const forgescript_1 = require('@tryforge/forgescript');
const __1 = require('..');
const ForgeSocialEventHandlers_1 = require('../structures/ForgeSocialEventHandlers');
exports.default = new ForgeSocialEventHandlers_1.ForgeSocialEventHandler({
  name: 'newYoutubeVideo',
  version: '1.0.0',
  description: 'This event is called when a tracked youtube channel uploads a video',
  listener(json) {
    const commands = this.getExtension(__1.ForgeSocial, true).commands.get('newYoutubeVideo');
    for (const command of commands) {
      forgescript_1.Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: json,
      });
    }
  },
});
//# sourceMappingURL=newYoutubeVideo.js.map
