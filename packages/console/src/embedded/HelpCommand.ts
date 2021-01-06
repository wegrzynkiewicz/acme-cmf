import type {ConsoleApplication} from '../define/ConsoleApplication';
import {ConsoleArgument} from '../define/ConsoleArgument';
import {ConsoleCommand} from '../define/ConsoleCommand';
import type {UsagePrinter} from '../runtime/UsagePrinter';
import {HelpOption} from './HelpOption';

export class HelpCommand extends ConsoleCommand {

    public constructor() {
        super({
            args: [
                new ConsoleArgument({
                    defaults: 'help',
                    description: 'The command whose help information will displayed.',
                    name: 'command',
                    required: false,
                }),
            ],
            description: 'Show the help information about selected command.',
            name: 'help',
            options: [
                HelpOption.instance,
            ],
        });
    }


    public async execute(
        {commander, usagePrinter}: {
            readonly commander: ConsoleApplication,
            readonly usagePrinter: UsagePrinter,
        },
        {args}: {
            readonly args: Map<string, string>,
        },
    ): Promise<number> {
        const commandName = args.get('command');
        if (commandName === undefined) {
            throw new Error('Cannot get valid command name.');
        }
        const command = commander.getCommandByName(commandName);
        usagePrinter.writeHelp(command);
        return 0;
    }
}
