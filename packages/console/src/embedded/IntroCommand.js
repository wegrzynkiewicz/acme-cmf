import {ConsoleCommand} from '../define/ConsoleCommand';
import {HelpOption} from './HelpOption';

export class IntroCommand extends ConsoleCommand {

    constructor({logo}) {
        super({
            aliases: ['show-intro'],
            description: 'Show the intro of console application.',
            hidden: true,
            name: 'intro',
            options: [
                new HelpOption(),
            ],
        });
        this.logo = logo;
    }

    async execute({console, output, usagePrinter}, {command}) {
        output.writeLine(this.logo);

        usagePrinter.writeHelp({
            ...console,
            description: '',
            name: '',
        });

        const name = usagePrinter.executableName;
        output.writeLine(`Type \`${name} help [command]\` for more information on specific commands.`);
        output.writeLine();

        return 0;
    }
}
