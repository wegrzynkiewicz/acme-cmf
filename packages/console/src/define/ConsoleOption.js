export class ConsoleOption {

    constructor({description, longFlags = [], name, parameter, shortFlags = []}) {
        this.description = description;
        this.longFlags = [...longFlags];
        this.name = name;
        this.parameter = parameter;
        this.shortFlags = [...shortFlags];

        if (this.longFlags.length === 0 && this.shortFlags.length === 0) {
            throw new Error(`Option named (${this.name}) must have flag.`);
        }
    }

    async execute(context, {next}) {
        return await next();
    }

    assert(value) {
        if (this.parameter) {
            this.parameter.assert(value);
        }
    }
}
