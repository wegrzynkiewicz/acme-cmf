import ConsoleArgument from '../define/ConsoleArgument';
import ConsoleCommand from '../define/ConsoleCommand';
import InputParser from '../runtime/InputParser';
import RuntimeContext from '../runtime/RuntimeContext';

export default class MainCommand extends ConsoleCommand {

    constructor({startupCommandName}) {
        super({
            args: [
                new ConsoleArgument({
                    defaults: startupCommandName,
                    description: 'The command to execute.',
                    name: 'command',
                    require: false,
                }),
                new ConsoleArgument({
                    defaults: [],
                    description: 'The arguments to pass to command.',
                    name: 'arguments',
                    require: false,
                    rest: true,
                }),
            ],
            description: 'The main build in command which execute correct command.',
            hidden: true,
            name: 'main',
        });
    }

    async execute(context) {
        const commandName = context.args.get('command');
        const argv = context.args.get('arguments');
        const command = context.application.getCommandByName(commandName);
        const parser = new InputParser({command});

        const {args, options} = parser.parse(argv);
        const newContext = new RuntimeContext({
            ...context,
            args,
            argv,
            options,
        });

        try {
            await command.execute(newContext);
        } catch (error) {
            throw error;
        }
    }
}
