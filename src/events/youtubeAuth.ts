import { Interpreter } from '@tryforge/forgescript';
import { ForgeSocial } from '..';
import { ForgeSocialEventHandler } from '../structures/ForgeSocialEventHandlers';

export default new ForgeSocialEventHandler({
  name: 'youtubeAuth',
  version: '1.0.0',
  description: 'This event is called when the youtube client is authenticated',
  listener(json) {
    const commands = this.getExtension(ForgeSocial, true).commands.get('youtubeAuth');

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