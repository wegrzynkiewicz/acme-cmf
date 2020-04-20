import InputParser from '../runtime/InputParser';
import RuntimeContext from '../runtime/RuntimeContext';
import UsagePrinter from '../services/UsagePrinter';

export default class ConsoleApplication {

    constructor({name, payload}) {
        this.name = name;
        this.commands = new Map();
        this.aliases = new Map();
        this.payload = payload === undefined ? null : payload;
    }

    registerCommand(command) {
        const names = [command.name, ...command.aliases];
        for (const name of names) {
            if (this.aliases.has(name)) {
                throw new Error(`Command named (${name}) is already exists.`);
            }
            this.aliases.set(name, command);
        }
        this.commands.set(command.name, command);
    }

    getCommandByName(commandName) {
        if (!this.aliases.has(commandName)) {
            throw new Error(`Command named (${commandName}) not exists.`);
        }
        return this.aliases.get(commandName);
    }

    async run({argv, startupCommandName, stderr, stdin, stdout}) {
        const command = this.getCommandByName(startupCommandName);
        const parser = new InputParser({command});
        const {args, options} = parser.parse(argv);
        const context = new RuntimeContext({
            application: this,
            args,
            argv,
            options,
            stderr,
            stdin,
            stdout,
            usagePrinter: new UsagePrinter(),
        });

        try {
            await command.execute(context);
        } catch (error) {
            throw error;
        }

        return context;
    }
}
