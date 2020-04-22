import {ConsoleOptionParameter} from './ConsoleOptionParameter';

export class ConsoleOption {

    constructor({description, longFlags, name, parameter, shortFlags}) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Invalid value name.');
        }
        if (parameter !== undefined && !(parameter instanceof ConsoleOptionParameter)) {
            throw new Error('Invalid option value.');
        }
        this.description = description === undefined ? '' : description;
        this.longFlags = longFlags === undefined ? [] : [...longFlags];
        this.name = name;
        this.parameter = parameter === undefined ? null : parameter;
        this.shortFlags = shortFlags === undefined ? [] : [...shortFlags];

        if (this.longFlags.length === 0 && this.shortFlags.length === 0) {
            throw new Error(`Option named (${this.name}) must have flag.`);
        }
    }

    assert(value) {
        if (this.parameter) {
            this.parameter.assert(value);
        }
    }
}
