import ConsoleCommand from '../define/ConsoleCommand';

export default class ListCommand extends ConsoleCommand {

    constructor() {
        super({
            description: 'Show the list of available commands.',
            hidden: true,
            name: 'list',
        });
    }

    async execute(context) {
        const {application, output, usagePrinter} = context;
        const command = application.getCommandByName('main');

        usagePrinter.printFirstLine(context, {
            ...command,
            name: '',
        });
        usagePrinter.printCommandArguments(context, command);
        usagePrinter.printCommandOptions(context, command);
        usagePrinter.printCommands(context, application.commands);

        output.flush();
    }
}
