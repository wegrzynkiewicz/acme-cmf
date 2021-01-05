import type {ConsoleOptionParameter} from './ConsoleOptionParameter';
import type {Executable} from './Executable';

export class ConsoleOption implements Executable {

    public readonly description: string;
    public readonly longFlags: string[];
    public readonly name: string;
    public readonly parameter?: ConsoleOptionParameter;
    public readonly shortFlags: string[];

    public constructor(
        {description, longFlags, name, parameter, shortFlags}: {
            readonly description?: string,
            readonly longFlags?: string[],
            readonly name: string,
            readonly parameter?: ConsoleOptionParameter,
            readonly shortFlags?: string[],
        },
    ) {
        this.description = description ?? '';
        this.longFlags = [...longFlags ?? []];
        this.name = name;
        this.parameter = parameter;
        this.shortFlags = [...shortFlags ?? []];

        if (this.longFlags.length === 0 && this.shortFlags.length === 0) {
            throw new Error(`Option named (${this.name}) must have flag.`);
        }
    }

    public assert(value: string): void {
        if (this.parameter) {
            this.parameter.assert(value);
        }
    }

    public async execute(
        globalContext: Record<string, unknown>,
        {next}: {
            next: () => Promise<number>,
        },
    ): Promise<number> {
        return await next();
    }
}
