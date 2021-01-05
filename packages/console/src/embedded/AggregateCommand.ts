import {ConsoleArgument} from '../define/ConsoleArgument';
import type {ConsoleApplication} from '../define/ConsoleApplication';
import {ConsoleCommand} from '../define/ConsoleCommand';
import type {ConsoleOption} from '../define/ConsoleOption';
import type {UsagePrinter} from '../runtime/UsagePrinter';
import {HelpOption} from './HelpOption';

export class AggregateCommand extends ConsoleCommand {

    public constructor(
        {description, name, options}: {
            readonly description?: string,
            readonly name: string,
            readonly options?: ConsoleOption[],
        },
    ) {
        super({
            args: [
                new ConsoleArgument({
                    defaults: undefined,
                    description: 'The command to execute.',
                    name: 'command',
                    required: false,
                }),
                new ConsoleArgument({
                    defaults: [],
                    description: 'The arguments to pass to command.',
                    name: 'arguments',
                    required: false,
                    rest: true,
                }),
            ],
            description,
            name,
            options: [
                HelpOption.instance,
                ...options ?? [],
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
            usagePrinter.writeHelp(this);
            return 0;
        }
        const command = this.getCommandByName(commandName);
        const argv = args.get('arguments') ?? '';
        const exitCode = await commander.executeCommand({argv, command});
        return exitCode;
    }
}
