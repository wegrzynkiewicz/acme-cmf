import ConsoleArgument from '../define/ConsoleArgument';
import ConsoleCommand from '../define/ConsoleCommand';

export default class MainCommand extends ConsoleCommand {

    constructor({commandName}) {
        if (typeof commandName !== 'string' || commandName.length === 0) {
            throw new Error('Invalid startup command name.');
        }
        super({
            args: [
                new ConsoleArgument({
                    defaults: commandName,
                    description: 'The command to execute.',
                    name: 'command',
                    require: false,
                }),
                new ConsoleArgument({
                    defaults: [],
                    description: 'The arguments to pass to command.',
                    name: 'arguments',
                    require: false,
                    rest: true,
                }),
            ],
            description: 'The main build in command which execute correct command.',
            hidden: true,
            name: 'main',
        });
    }

    async execute(context) {
        const {application, input, output} = context;
        const commandName = input.args.get('command');
        if (commandName === this.name) {
            throw new Error(`Cannot direct run a command named (${this.name}).`);
        }
        const argv = input.args.get('arguments');
        const result = await application.run({
            argv,
            commandName,
            stderr: output.stderr,
            stdin: input.stdin,
            stdout: output.stdout,
        });
        return result;
    }
}
