/* eslint-disable quote-props */

import Table from 'cli-table3';

export class UsagePrinter {

    constructor({application, output}) {
        this.application = application;
        this.output = output;
    }

    createTable() {
        const table = new Table({
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

    writeHelp(command) {
        this.writeCommandUsage(command);
        this.writeCommandDescription(command);
        this.writeCommandAliases(command);

        const table = this.createTable();
        this.putCommandArgumentsToTable(command, table);
        this.putCommandOptionsToTable(command, table);
        this.putCommandCommandsToTable(command, table);
        this.writeTable(table);
    }

    writeTable(table) {
        if (table.length > 0) {
            this.output.write(table.toString());
            this.output.writeLine();
        }
    }

    writeCommandUsage(command) {
        const {args, name, options} = command;

        this.output.write('Usage:');
        this.output.write(` ${this.application.name}`);
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

    writeCommandDescription(command) {
        const {description} = command;
        if (description) {
            this.output.writeLine(description);
            this.output.writeLine();
        }
    }

    writeCommandAliases(command) {
        const {aliases} = command;
        if (aliases.size > 0) {
            this.output.writeLine('Aliases:');
            const aliasLine = [...aliases.values()].join(', ');
            this.output.writeLine(`  ${aliasLine}`);
            this.output.writeLine();
        }
    }

    getCommandArguments(command) {
        const list = [];
        for (const argument of command.args.values()) {
            const argumentData = [
                `  ${this.getCommandArgumentLabel(argument)}`,
                argument.description,
            ];
            list.push(argumentData);
        }
        return list;
    }

    getCommandArgumentLabel(argument) {
        const {defaults, name, rest, required} = argument;
        let label = name;
        if (rest) {
            label += '...';
        }
        if (defaults && !rest) {
            label += `="${defaults.toString()}"`;
        }
        label = required ? `<${label}>` : `[${label}]`;
        return label;
    }

    putCommandArgumentsToTable(command, table) {
        if (command.args && command.args.size > 0) {
            table.push(['Arguments:', '']);
            table.push(...this.getCommandArguments(command));
            table.push([]);
        }
    }

    getCommandOptions(command) {
        const list = [];
        for (const option of command.options.values()) {
            const optionData = [
                `  ${this.getCommandOptionLabel(option)}`,
                option.description,
            ];
            list.push(optionData);
        }
        return list;
    }

    getCommandOptionLabel(option) {
        const {longFlags, parameter, shortFlags} = option;

        const flags = [];
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

    getCommandOptionParameterLabel(parameter) {
        const {defaults, name, required} = parameter;
        let label = name;
        if (defaults) {
            label += `="${defaults}"`;
        }
        label = required ? `<${label}>` : `[${label}]`;
        return label;
    }

    putCommandOptionsToTable(command, table) {
        if (command.options && command.options.size > 0) {
            table.push(['Options:', '']);
            table.push(...this.getCommandOptions(command));
            table.push([]);
        }
    }

    getAvailableCommands(command) {
        const list = [];
        for (const child of command.commands.values()) {
            if (!child.hidden) {
                list.push(this.getAvailableCommand(child));
            }
        }
        return list;
    }

    getAvailableCommand(command) {
        const {name, description, options, args} = command;
        let label = `  ${name}`;
        if (options.length > 0) {
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

    putCommandCommandsToTable(command, table) {
        if (command.commands && command.commands.size > 0) {
            table.push(['Available commands:', '']);
            table.push(...this.getAvailableCommands(command));
            table.push([]);
        }
    }
}
