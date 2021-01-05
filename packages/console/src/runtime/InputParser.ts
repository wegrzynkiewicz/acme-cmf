import * as minimist from 'minimist';
import type {ConsoleCommand} from '../define/ConsoleCommand';

function onUnknownArgument(argument: string): boolean {
    if (argument.startsWith('-')) {
        throw new Error(`Unexpected option named (${argument}).`);
    }
    return false;
}

function getBooleanOptions(command: ConsoleCommand): string[] {
    const options: string[] = [];
    for (const option of command.options.values()) {
        if (!option.parameter) {
            options.push(option.name);
        }
    }
    return options;
}

function getStringOptions(command: ConsoleCommand): string[] {
    const options: string[] = [];
    for (const option of command.options.values()) {
        if (option.parameter) {
            options.push(option.name);
        }
    }
    return options;
}

function getDefaultOptions(command: ConsoleCommand): Record<string, unknown> {
    const defaults = {};
    for (const option of command.options.values()) {
        const {name, parameter} = option;
        if (parameter) {
            defaults[name] = parameter.defaults;
        }
    }
    return defaults;
}

function getAliasOptions(command: ConsoleCommand): Record<string, string> {
    const aliases: Record<string, string> = {};
    for (const option of command.options.values()) {
        const {name, longFlags, shortFlags} = option;
        for (const longFlag of longFlags) {
            aliases[longFlag] = name;
        }
        for (const shortFlag of shortFlags) {
            aliases[shortFlag] = name;
        }
    }
    return aliases;
}

export class InputParser {

    private readonly command: ConsoleCommand;

    public constructor(
        {command}: { command: ConsoleCommand },
    ) {
        this.command = command;
    }

    public parse(argv: string): { args: Map<string, unknown>, options: Map<string, unknown> } {
        const {command} = this;
        const settings: minimist.Opts = {
            '--': false,
            alias: getAliasOptions(command),
            boolean: getBooleanOptions(command),
            default: getDefaultOptions(command),
            stopEarly: true,
            string: getStringOptions(command),
            unknown: onUnknownArgument,
        };

        const argumentWords: string[] = [...argv];
        const parsed = minimist(argumentWords, settings);
        const {_: parsedArguments, ...parsedOptions} = parsed;

        const args = new Map<string, unknown>();

        for (const argument of command.args.values()) {
            const argumentValue = argument.digValueFromArray(parsedArguments);
            argument.assert(argumentValue);
            args.set(argument.name, argumentValue);
        }

        if (parsedArguments.length > 0) {
            throw new Error(`Passed more arguments then expected count (${command.args.size}).`);
        }

        const options = new Map<string, unknown>();
        for (const option of command.options.values()) {
            const optionValue = parsedOptions[option.name] as unknown;
            option.assert(optionValue);
            options.set(option.name, optionValue);
        }

        return {args, options};
    }
}
