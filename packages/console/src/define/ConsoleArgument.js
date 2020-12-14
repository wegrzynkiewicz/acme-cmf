export class ConsoleArgument {

    constructor({defaults, description, name, rest, required}) {
        this.defaults = defaults;
        this.description = description;
        this.name = name;
        this.required = required;
        this.rest = rest;
    }

    digValueFromArray(args) {
        const {defaults, required, rest, name} = this;
        if (args.length === 0) {
            if (required) {
                throw new Error(`Not passed required argument named (${name}).`);
            }
            if (rest && defaults === null) {
                return [];
            }
            return defaults;
        }
        if (rest) {
            return args.splice(0);
        }
        return args.shift();
    }

    assert(value) {
        const {required, rest, name} = this;
        if (rest) {
            if (!Array.isArray(value)) {
                throw new Error(`Rest argument named (${name}) is not array.`);
            }
            if (required && value.length === 0) {
                throw new Error(`Required rest argument named (${name}) is empty array.`);
            }
        }
        if (value === '' && required) {
            throw new Error(`Required argument named (${name}) is empty.`);
        }
    }
}
