import {ConsoleArgument} from '../define/ConsoleArgument';
import {ConsoleCommand} from '../define/ConsoleCommand';
import {HelpOption} from './HelpOption';

export class HelpCommand extends ConsoleCommand {

    constructor() {
        super({
            args: [
                new ConsoleArgument({
                    defaults: 'help',
                    description: 'The command whose help information will displayed.',
                    name: 'command',
                    require: false,
                }),
            ],
            description: 'Show the help information about selected command.',
            name: 'help',
            options: [
                new HelpOption(),
            ],
        });
    }

    async execute(context) {
        const commandName = context.input.args.get('command');
        const command = context.application.getCommandByName(commandName);
        await context.usagePrinter.writeHelp(command);
    }
}
