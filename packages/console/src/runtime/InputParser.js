import minimist from 'minimist';
import {ConsoleCommand} from '../define/ConsoleCommand';

export class InputParser {

    constructor({command}) {
        if (!(command instanceof ConsoleCommand)) {
            throw new Error('Invalid startup command in console application.');
        }
        this.command = command;
    }

    getBooleanOptions() {
        const options = [];
        for (const option of this.command.options.values()) {
            if (!option.parameter) {
                options.push(option);
            }
        }
        return options;
    }

    getStringOptions() {
        const options = [];
        for (const option of this.command.options.values()) {
            if (option.parameter) {
                options.push(option);
            }
        }
        return options;
    }

    getDefaultOptions() {
        const defaults = {};
        for (const option of this.command.options.values()) {
            const {name, parameter} = option;
            if (parameter) {
                defaults[name] = parameter.defaults;
            }
        }
        return defaults;
    }

    getAliasOptions() {
        const aliases = {};
        for (const option of this.command.options.values()) {
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

    onUnknownArgument(argument) {
        if (argument.indexOf('-') === 0) {
            throw new Error(`Unexpected option named (${argument}).`);
        }
    }

    parse(argv) {
        const settings = {
            '--': false,
            alias: this.getAliasOptions(),
            boolean: this.getBooleanOptions(),
            default: this.getDefaultOptions(),
            stopEarly: true,
            strings: this.getStringOptions(),
            unknown: this.onUnknownArgument,
        };

        const argumentWords = [...argv];
        const parsed = minimist(argumentWords, settings);
        const {_: parsedArguments, ...parsedOptions} = parsed;

        const args = new Map();

        for (const argument of this.command.args.values()) {
            const argumentValue = argument.digValueFromArray(parsedArguments);
            argument.assert(argumentValue);
            args.set(argument.name, argumentValue);
        }

        if (parsedArguments.length > 0) {
            throw new Error(`Passed more arguments then expected count (${this.command.args.size}).`);
        }

        const options = new Map();
        for (const option of this.command.options.values()) {
            const optionValue = parsedOptions[option.name];
            option.assert(optionValue);
            options.set(option.name, optionValue);
        }

        return {args, options};
    }
}
