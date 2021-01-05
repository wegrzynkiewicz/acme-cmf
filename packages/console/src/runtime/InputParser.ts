import minimist from 'minimist';
import {ConsoleCommand} from '../define/ConsoleCommand';

function getBooleanOptions(command) {
    const options = [];
    for (const option of command.options.values()) {
        if (!option.parameter) {
            options.push(option);
        }
    }
    return options;
}

function getStringOptions(command) {
    const options = [];
    for (const option of command.options.values()) {
        if (option.parameter) {
            options.push(option);
        }
    }
    return options;
}

function getDefaultOptions(command) {
    const defaults = {};
    for (const option of command.options.values()) {
        const {name, parameter} = option;
        if (parameter) {
            defaults[name] = parameter.defaults;
        }
    }
    return defaults;
}

function getAliasOptions(command) {
    const aliases = {};
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

function onUnknownArgument(argument) {
    if (argument.indexOf('-') === 0) {
        throw new Error(`Unexpected option named (${argument}).`);
    }
}

export class InputParser {

    constructor({command}) {
        if (!(command instanceof ConsoleCommand)) {
            throw new Error('Invalid startup command in console application.');
        }
        this.command = command;
    }

    parse(argv) {
        const {command} = this;
        const settings = {
            '--': false,
            alias: getAliasOptions(command),
            boolean: getBooleanOptions(command),
            default: getDefaultOptions(command),
            stopEarly: true,
            strings: getStringOptions(command),
            unknown: onUnknownArgument,
        };

        const argumentWords = [...argv];
        const parsed = minimist(argumentWords, settings);
        const {_: parsedArguments, ...parsedOptions} = parsed;

        const args = new Map();

        for (const argument of command.args.values()) {
            const argumentValue = argument.digValueFromArray(parsedArguments);
            argument.assert(argumentValue);
            args.set(argument.name, argumentValue);
        }

        if (parsedArguments.length > 0) {
            throw new Error(`Passed more arguments then expected count (${command.args.size}).`);
        }

        const options = new Map();
        for (const option of command.options.values()) {
            const optionValue = parsedOptions[option.name];
            option.assert(optionValue);
            options.set(option.name, optionValue);
        }

        return {args, options};
    }
}
