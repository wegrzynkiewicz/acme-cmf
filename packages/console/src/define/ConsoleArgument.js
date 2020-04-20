export default class ConsoleArgument {

    constructor({defaults, description, name, rest, required}) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Invalid value name.');
        }
        this.defaults = defaults;
        this.description = description === undefined ? '' : description;
        this.name = name;
        this.required = required === undefined ? false : required;
        this.rest = rest === undefined ? false : rest;
    }

    digValueFromArray(args) {
        if (args.length === 0) {
            if (this.required) {
                throw new Error(`Not passed required argument named (${this.name}).`);
            }
            if (this.rest && this.defaults === null) {
                return [];
            }
            return this.defaults;
        }
        if (this.rest) {
            return args.splice(0);
        }
        return args.shift();
    }

    assert(value) {
        if (this.rest) {
            if (!Array.isArray(value)) {
                throw new Error(`Rest argument named (${this.name}) is not array.`);
            }
            if (this.required && value.length === 0) {
                throw new Error(`Required rest argument named (${this.name}) is empty array.`);
            }
        }
        if (value === '' && this.required) {
            throw new Error(`Required argument named (${this.name}) is empty.`);
        }
    }
}
