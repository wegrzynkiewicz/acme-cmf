import ConsoleCommand from '../define/ConsoleCommand';
import ConsoleOption from '../define/ConsoleOption';

export default class ListCommand extends ConsoleCommand {

    constructor() {
        super({
            aliases: ['list-commands'],
            description: 'Show the list of available commands.',
            name: 'list',
            options: [
                new ConsoleOption({
                    defaults: false,
                    description: 'Do not output any message.',
                    longFlags: ['quiet'],
                    name: 'quiet',
                    require: false,
                    shortFlags: ['q'],
                }),
            ],
        });
    }

    async execute(context) {
        const {application, output, usagePrinter} = context;
        await usagePrinter.printCommands(context, application.commands);
        output.flush();
        return 0;
    }
}
