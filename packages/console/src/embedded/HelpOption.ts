import {ConsoleOption} from '../define/ConsoleOption';
import type {ConsoleCommand} from '../define/ConsoleCommand';
import type {UsagePrinter} from '../runtime/UsagePrinter';

export class HelpOption extends ConsoleOption {

    public static readonly instance: HelpOption = new HelpOption();

    public constructor() {
        super({
            description: 'Show the help information about this command.',
            longFlags: ['help'],
            name: 'help',
            shortFlags: ['h'],
        });
    }

    public async execute(
        {usagePrinter}: {
            readonly usagePrinter: UsagePrinter,
        },
        {command, options, next}: {
            readonly command: ConsoleCommand,
            readonly options: Map<string, unknown>,
            readonly next: () => Promise<number>,
        },
    ): Promise<number> {
        if (options.get('help') === true) {
            usagePrinter.writeHelp(command);
            return 0;
        }
        return await next();
    }
}
