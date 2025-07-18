import { Interpreter } from "@tryforge/forgescript";
import { ForgeSocial } from "..";
import { ForgeSocialEventHandler } from "../structures/ForgeSocialEventHandlers";

export default new ForgeSocialEventHandler({
    name: "error",
    version: "1.0.0",
    description: "This event is called when an error occurs",
    listener(err) {
        const commands = this.getExtension(ForgeSocial, true).commands.get("error")

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: err
            })
        }
    },
})