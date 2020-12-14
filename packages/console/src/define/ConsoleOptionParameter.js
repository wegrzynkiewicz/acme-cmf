export class ConsoleOptionParameter {

    constructor({defaults, name, required = false}) {
        this.defaults = defaults;
        this.name = name;
        this.required = required;
    }

    assert(value) {
        if (value === '' && this.required) {
            throw new Error(`Required option parameter named (${this.name}) is empty.`);
        }
    }
}
