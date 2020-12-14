export class ConsoleCommand {

    constructor({aliases = [], args = [], description = '', name, hidden = false, options = []}) {
        this.aliases = new Set(aliases);
        this.args = new Map();
        this.description = description;
        this.hidden = hidden;
        this.name = name;
        this.options = new Map();

        for (const argument of args) {
            this.args.set(argument.name, argument);
        }

        for (const option of options) {
            this.options.set(option.name, option);
        }
    }

    async execute() {
        throw new Error('Console command must implement execute method.');
    }
}
