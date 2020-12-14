import {createDebugger} from '@acme/debug';

const debug = createDebugger('command:registry');

export class ConsoleCommand {

    constructor(
        {
            aliases = [],
            args = [],
            commands = [],
            description = '',
            name,
            hidden = false,
            options = [],
        },
    ) {
        this.aliases = new Set(aliases);
        this.args = new Map();
        this.commands = new Map();
        this.description = description;
        this.hidden = hidden;
        this.name = name;
        this.options = new Map();

        for (const argument of args) {
            this.args.set(argument.name, argument);
        }

        for (const command of commands) {
            this.register(command);
        }

        for (const option of options) {
            this.options.set(option.name, option);
        }
    }

    register(command) {
        debug('Registered console command (%s) to parent command (%s)', command.name, this.name);
        this.commands.set(command.name, command);
    }

    getCommandByName(commandName) {
        for (const command of this.commands.values()) {
            if (command.name === commandName) {
                return command;
            }
            if (command.aliases.has(commandName)) {
                return command;
            }
        }
        throw new Error(`Command named (${commandName}) not exists.`);
    }

    async execute(serviceLocator, context) {
        throw new Error('Console command must implement execute method.');
    }
}
