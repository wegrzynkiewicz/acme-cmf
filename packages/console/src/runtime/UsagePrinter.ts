/* eslint-disable quote-props */

import * as CliTable3 from 'cli-table3';
import type {ConsoleArgument} from '../define/ConsoleArgument';
import type {ConsoleCommand} from '../define/ConsoleCommand';
import type {ConsoleOption} from '../define/ConsoleOption';
import type {ConsoleOptionParameter} from '../define/ConsoleOptionParameter';
import type {Output} from './Output';

export class UsagePrinter {

    public readonly executableName: string;
    private readonly output: Output;

    public constructor(
        {executableName, output}: {
            readonly executableName: string,
            readonly output: Output,
        },
    ) {
        this.executableName = executableName;
        this.output = output;
    }

    public createTable(): CliTable3.Table {
        const table = new CliTable3({
            chars: {
                'bottom': '',
                'bottom-left': '',
                'bottom-mid': '',
                'bottom-right': '',
                'left': '',
                'left-mid': '',
                'mid': '',
                'mid-mid': '',
                'middle': '',
                'right': '',
                'right-mid': '',
                'top': '',
                'top-left': '',
                'top-mid': '',
                'top-right': '',
            },
            style: {
                'padding-left': 0,
                'padding-right': 3,
            },
        });
        return table;
    }

    public writeHelp(command: ConsoleCommand): void {
        this.writeCommandUsage(command);
        this.writeCommandDescription(command);
        this.writeCommandAliases(command);

        const table = this.createTable();
        this.putCommandArgumentsToTable(command, table);
        this.putCommandOptionsToTable(command, table);
        this.putCommandCommandsToTable(command, table);
        this.writeTable(table);
    }

    public writeTable(table: CliTable3.Table): void {
        if (table.length && table.length > 0) {
            this.output.write(table.toString());
            this.output.writeLine();
        }
    }

    public writeCommandUsage(command: ConsoleCommand): void {
        const {args, name, options} = command;

        this.output.write('Usage:');
        this.output.write(` ${this.executableName}`);
        if (name !== '') {
            this.output.write(` ${name}`);
        }
        if (options.size > 0) {
            this.output.write(' [options]');
        }
        if (args.size > 0) {
            for (const argument of args.values()) {
                const commandArgumentLabel = this.getCommandArgumentLabel(argument);
                this.output.write(` ${commandArgumentLabel}`);
            }
        }
        this.output.writeLine();
        this.output.writeLine();
    }

    public writeCommandDescription(command: ConsoleCommand): void {
        const {description} = command;
        if (description) {
            this.output.writeLine(description);
            this.output.writeLine();
        }
    }

    public writeCommandAliases(command: ConsoleCommand): void {
        const {aliases} = command;
        if (aliases.size > 0) {
            this.output.writeLine('Aliases:');
            const aliasLine = [...aliases.values()].join(', ');
            this.output.writeLine(`  ${aliasLine}`);
            this.output.writeLine();
        }
    }

    public getCommandArguments(command: ConsoleCommand): string[][] {
        const list: string[][] = [];
        for (const argument of command.args.values()) {
            const argumentData = [
                `  ${this.getCommandArgumentLabel(argument)}`,
                argument.description,
            ];
            list.push(argumentData);
        }
        return list;
    }

    public getCommandArgumentLabel(argument: ConsoleArgument): string {
        const {defaults, name, rest, required} = argument;
        let label = name;
        if (rest) {
            label += '...';
        }
        if (typeof defaults === 'string' && !rest) {
            label += `="${defaults.toString()}"`;
        }
        label = required ? `<${label}>` : `[${label}]`;
        return label;
    }

    public putCommandArgumentsToTable(command: ConsoleCommand, table: CliTable3.Table): void {
        if (command.args.size > 0) {
            table.push(['Arguments:', '']);
            table.push(...this.getCommandArguments(command));
            table.push([]);
        }
    }

    public getCommandOptions(command: ConsoleCommand): string[][] {
        const list: string[][] = [];
        for (const option of command.options.values()) {
            const optionData = [
                `  ${this.getCommandOptionLabel(option)}`,
                option.description,
            ];
            list.push(optionData);
        }
        return list;
    }

    public getCommandOptionLabel(option: ConsoleOption): string {
        const {longFlags, parameter, shortFlags} = option;

        const flags: string[] = [];
        if (shortFlags.length > 0) {
            for (const shortFlag of shortFlags) {
                flags.push(`-${shortFlag}`);
            }
        }
        if (longFlags.length > 0) {
            for (const longFlag of longFlags) {
                flags.push(`--${longFlag}`);
            }
        }

        let label = flags.join(', ');
        if (parameter) {
            label += '=';
            label += this.getCommandOptionParameterLabel(parameter);
        }

        return label;
    }

    public getCommandOptionParameterLabel(parameter: ConsoleOptionParameter): string {
        const {defaults, name, required} = parameter;
        let label = name;
        if (typeof defaults === 'string') {
            label += `="${defaults}"`;
        }
        label = required ? `<${label}>` : `[${label}]`;
        return label;
    }

    public putCommandOptionsToTable(command: ConsoleCommand, table: CliTable3.Table): void {
        if (command.options.size > 0) {
            table.push(['Options:', '']);
            table.push(...this.getCommandOptions(command));
            table.push([]);
        }
    }

    public getAvailableCommands(command: ConsoleCommand): string[][] {
        const list: string[][] = [];
        for (const child of command.commands.values()) {
            if (!child.hidden) {
                list.push(this.getAvailableCommandDescription(child));
            }
        }
        return list;
    }

    public getAvailableCommandDescription(command: ConsoleCommand): [string, string] {
        const {name, description, options, args} = command;
        let label = `  ${name}`;
        if (options.size > 0) {
            label += ' [options]';
        }
        if (args.size > 0) {
            for (const argument of args.values()) {
                const argumentLabel = this.getCommandArgumentLabel(argument);
                label += ` ${argumentLabel}`;
            }
        }
        return [
            label,
            description,
        ];
    }

    public putCommandCommandsToTable(command: ConsoleCommand, table: CliTable3.Table): void {
        if (command.commands.size > 0) {
            table.push(['Available commands:', '']);
            table.push(...this.getAvailableCommands(command));
            table.push([]);
        }
    }
}
