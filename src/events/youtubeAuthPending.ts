import { Interpreter } from '@tryforge/forgescript';
import { ForgeSocial } from '..';
import { ForgeSocialEventHandler } from '../structures/ForgeSocialEventHandlers';

export default new ForgeSocialEventHandler({
  name: 'youtubeAuthPending',
  version: '1.0.0',
  description: 'This event is called when the youtube client is pending authentication',
  listener(json) {
    const commands = this.getExtension(ForgeSocial, true).commands.get('youtubeAuthPending');

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
