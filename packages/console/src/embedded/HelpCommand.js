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

    async execute({console, usagePrinter}, {args}) {
        const commandName = args.get('command');
        const command = console.getCommandByName(commandName);
        await usagePrinter.writeHelp(command);
    }
}
