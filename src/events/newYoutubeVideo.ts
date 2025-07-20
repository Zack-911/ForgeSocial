import { Interpreter } from '@tryforge/forgescript';
import { ForgeSocial } from '..';
import { ForgeSocialEventHandler } from '../structures/ForgeSocialEventHandlers';

export default new ForgeSocialEventHandler({
  name: 'newYoutubeVideo',
  version: '1.0.0',
  description: 'This event is called when a tracked youtube channel uploads a video',
  listener(json) {
    const commands = this.getExtension(ForgeSocial, true).commands.get('newYoutubeVideo');

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: json,
      });
    }
  },
});
