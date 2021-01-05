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
                HelpOption.instance,
            ],
        });
    }

    async execute({commander, usagePrinter}, {args}) {
        const commandName = args.get('command');
        const command = commander.getCommandByName(commandName);
        usagePrinter.writeHelp(command);
    }
}
