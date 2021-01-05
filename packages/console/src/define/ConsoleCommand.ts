import {createDebugger} from '@acme/debug';
import type {ConsoleArgument} from './ConsoleArgument';
import type {ConsoleOption} from './ConsoleOption';
import type {Executable} from './Executable';

const debug = createDebugger('command:registry');

export class ConsoleCommand implements Executable {

    public readonly aliases: Set<string> = new Set<string>();
    public readonly args: Map<string, ConsoleArgument> = new Map<string, ConsoleArgument>();
    public readonly commands: Map<string, ConsoleCommand> = new Map<string, ConsoleCommand>();
    public readonly description: string;
    public readonly hidden: boolean;
    public readonly name: string;
    public readonly options: Map<string, ConsoleOption> = new Map<string, ConsoleOption>();

    public constructor(
        {aliases, args, commands, description, name, hidden, options}: {
            readonly aliases?: string[],
            readonly args?: ConsoleArgument[],
            readonly commands?: ConsoleCommand[],
            readonly description?: string,
            readonly name: string,
            readonly hidden?: boolean,
            readonly options?: ConsoleOption[],
        },
    ) {
        this.description = description ?? '';
        this.hidden = hidden ?? false;
        this.name = name;

        for (const alias of aliases ?? []) {
            this.aliases.add(alias);
        }

        for (const argument of args ?? []) {
            this.args.set(argument.name, argument);
        }

        for (const command of commands ?? []) {
            this.registerCommand(command);
        }

        for (const option of options ?? []) {
            this.options.set(option.name, option);
        }
    }

    public registerCommand(command: ConsoleCommand): void {
        debug('Registered console command (%s) to parent command (%s)', command.name, this.name);
        this.commands.set(command.name, command);
    }

    public getCommandByName(commandName: string): ConsoleCommand {
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

    public async execute(globalContext: Record<string, unknown>, context: Record<string, unknown>): Promise<number> {
        throw new Error('Console command must implement execute method.');
    }
}
