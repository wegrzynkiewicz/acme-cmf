export class ConsoleCommand {

    constructor({aliases, args, description, name, hidden, options}) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Invalid command name.');
        }
        this.aliases = new Set(aliases === undefined ? [] : aliases);
        this.args = new Map();
        this.description = description === undefined ? '' : description;
        this.hidden = hidden === undefined ? false : hidden;
        this.name = name;
        this.options = new Map();

        for (const argument of args || []) {
            this.registerArgument(argument);
        }

        for (const option of options || []) {
            this.registerOption(option);
        }
    }

    registerArgument(argument) {
        this.args.set(argument.name, argument);
    }

    registerOption(option) {
        this.options.set(option.name, option);
    }

    async execute() {
        const error = new Error('Console command must implement execute method.');
        await Promise.reject(error);
    }
}
