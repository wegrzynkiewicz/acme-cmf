import Input from '../runtime/Input';
import InputParser from '../runtime/InputParser';
import Output from '../runtime/Output';
import RuntimeContext from '../runtime/RuntimeContext';
import UsagePrinter from '../runtime/UsagePrinter';

export default class ConsoleApplication {

    constructor({name, payload}) {
        this.aliases = new Map();
        this.commands = new Map();
        this.middlewares = new Set();
        this.name = name;
        this.payload = payload;
    }

    getCommandByName(commandName) {
        if (!this.aliases.has(commandName)) {
            throw new Error(`Command named (${commandName}) not exists.`);
        }
        return this.aliases.get(commandName);
    }

    registerCommand(command) {
        const names = [command.name, ...command.aliases];
        for (const name of names) {
            if (this.aliases.has(name)) {
                throw new Error(`Command named (${name}) already exists.`);
            }
            this.aliases.set(name, command);
        }
        this.commands.set(command.name, command);
    }

    registerMiddleware(middleware) {
        this.middlewares.add(middleware);
    }

    async run({argv, commandName, stderr, stdin, stdout}) {
        const command = this.getCommandByName(commandName);
        const parser = new InputParser({command});
        const {args, options} = parser.parse(argv);

        const application = this;
        const input = new Input({args, options, stdin});
        const output = new Output({stderr, stdout});
        const usagePrinter = new UsagePrinter({application, output});
        const context = new RuntimeContext({
            application,
            command,
            input,
            output,
            usagePrinter,
        });

        const middlewares = [...this.middlewares.values(), this];

        function createNext() {
            return async function next(contextFromMiddleware) {
                if (middlewares.length > 0) {
                    const middleware = middlewares.shift();
                    const exitCode = await middleware.execute(contextFromMiddleware, createNext());
                    return exitCode;
                }
                return null;
            };
        }

        const next = createNext();
        const exitCode = await next(context);

        return exitCode;
    }

    async execute(context, next) {
        try {
            const exitCode = await context.command.execute(context, next);
            return exitCode;
        } catch (error) {
            context.output.error(error);
            return 1;
        }
    }
}
