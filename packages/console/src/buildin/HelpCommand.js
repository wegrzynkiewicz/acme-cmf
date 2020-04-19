import ConsoleArgument from '../define/ConsoleArgument';
import ConsoleCommand from '../define/ConsoleCommand';
import ConsoleOption from '../define/ConsoleOption';
import ConsoleOptionParameter from '../define/ConsoleOptionParameter';

export default class HelpCommand extends ConsoleCommand {

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
                new ConsoleOption({
                    defaults: 'verbose',
                    description: 'The command whose help information will displayed.',
                    longFlags: [],
                    name: 'command',
                    parameter: new ConsoleOptionParameter({
                        defaults: 'debug',
                        name: 'level',
                        required: true,
                    }),
                    require: false,
                    shortFlags: ['v', 'a'],
                }),
            ],
        });
    }

    async execute(context) {
        const commandName = context.args.get('command');
        const command = context.application.getCommandByName(commandName);
        await context.usagePrinter.printCommandUsage(context, command);
    }
}
