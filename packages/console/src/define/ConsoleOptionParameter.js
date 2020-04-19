export default class ConsoleOptionParameter {

    constructor({defaults, name, required}) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Invalid value name.');
        }
        this.defaults = defaults === undefined ? null : defaults;
        this.name = name;
        this.required = required === undefined ? false : required;
    }

    assert(value) {
        if (value === '' && this.required) {
            throw new Error(`Required option parameter named (${this.name}) is empty.`);
        }
    }
}
