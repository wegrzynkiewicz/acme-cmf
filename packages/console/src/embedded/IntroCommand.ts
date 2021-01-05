import type {ConsoleApplication} from '../define/ConsoleApplication';
import {ConsoleCommand} from '../define/ConsoleCommand';
import type {UsagePrinter} from '../runtime/UsagePrinter';
import type {Output} from '../runtime/Output';
import {HelpOption} from './HelpOption';

export class IntroCommand extends ConsoleCommand {

    private readonly logo: string;

    public constructor({logo}: { logo: string }) {
        super({
            aliases: ['show-intro'],
            description: 'Show the intro of console application.',
            hidden: true,
            name: 'intro',
            options: [
                HelpOption.instance,
            ],
        });
        this.logo = logo;
    }

    public async execute(
        {commander, output, usagePrinter}: {
            readonly commander: ConsoleApplication,
            readonly output: Output,
            readonly usagePrinter: UsagePrinter,
        },
        {args}: {
            readonly args: Map<string, string>,
        },
    ): Promise<number> {
        output.writeLine(this.logo);

        usagePrinter.writeHelp(commander);

        const name = usagePrinter.executableName;
        output.writeLine(`Type \`${name} help [command]\` for more information on specific commands.`);
        output.writeLine();

        return 0;
    }
}
