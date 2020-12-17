import {ConsoleArgument, ConsoleCommand, HelpOption} from '../..';

export class AggregateCommand extends ConsoleCommand {

    constructor({description, name, options = []}) {
        super({
            args: [
                new ConsoleArgument({
                    defaults: undefined,
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
            description,
            name,
            options: [
                HelpOption.instance,
                ...options,
            ],
        });
    }

    async execute({commander, usagePrinter}, {args}) {
        const commandName = args.get('command');
        if (commandName === undefined) {
            usagePrinter.writeHelp(this);
            return 0;
        }
        const command = this.getCommandByName(commandName);
        const argv = args.get('arguments');
        const exitCode = await commander.executeCommand({argv, command});
        return exitCode;
    }
}
