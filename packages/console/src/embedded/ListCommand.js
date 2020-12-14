import {ConsoleCommand} from '../define/ConsoleCommand';
import {ConsoleOption} from '../define/ConsoleOption';
import {HelpOption} from './HelpOption';

export class ListCommand extends ConsoleCommand {

    constructor() {
        super({
            aliases: ['list-commands'],
            description: 'Show the list of available commands.',
            name: 'list',
            options: [
                new ConsoleOption({
                    defaults: false,
                    description: 'Output as json.',
                    longFlags: ['json'],
                    name: 'json',
                    require: false,
                    shortFlags: ['j'],
                }),
                new HelpOption(),
            ],
        });
    }

    async execute(context) {
        const {application, input, output, usagePrinter} = context;
        const {commands} = application;
        if (input.options.get('json')) {
            const data = [...commands.values()].map((command) => ({
                ...command,
                args: [...command.args.values()],
                options: [...command.options.values()],
            }));
            const response = JSON.stringify(data);
            output.writeLine(response);
            return 0;
        }
        const table = usagePrinter.createTable();
        usagePrinter.putCommandCommandsToTable({commands}, table);
        usagePrinter.writeTable(table);
        return 0;
    }
}
