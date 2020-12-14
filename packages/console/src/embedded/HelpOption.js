import {ConsoleOption} from '../define/ConsoleOption';

export class HelpOption extends ConsoleOption {

    constructor() {
        super({
            defaults: false,
            description: 'Show the help information about this command.',
            longFlags: ['help'],
            name: 'help',
            shortFlags: ['h'],
        });
    }

    async execute({usagePrinter}, {command, options, next}) {
        if (options.get('help')) {
            usagePrinter.writeHelp(command);
            return 0;
        }
        return next();
    }

    resolveArguments(context) {
        const {command} = context;
        if (command.name === 'main') {
            return {
                argv: [],
                commandName: 'intro',
            };
        }
        return {
            argv: [command.name],
            commandName: 'help',
        };
    }
}
