import InputParser from '../runtime/InputParser';
import RuntimeContext from '../runtime/RuntimeContext';
import UsagePrinter from '../services/UsagePrinter';

export default class ConsoleApplication {

    constructor({name, payload}) {
        this.name = name;
        this.commands = new Map();
        this.payload = payload === undefined ? null : payload;
    }

    registerCommand(command) {
        this.commands.set(command.name, command);
    }

    getCommandByName(commandName) {
        if (!this.commands.has(commandName)) {
            throw new Error(`Command named (${commandName}) not exists.`);
        }
        return this.commands.get(commandName);
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
