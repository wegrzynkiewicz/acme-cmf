import ConsoleCommand from '../define/ConsoleCommand';

export default class ListCommand extends ConsoleCommand {

    constructor() {
        super({
            aliases: ['list-commands'],
            description: 'Show the list of available commands.',
            name: 'list',
        });
    }

    async execute(context) {
        const {application, output, usagePrinter} = context;
        await usagePrinter.printCommands(context, application.commands);
        output.flush();
    }
}
