export default class UsagePrinter {

    printCommandUsage(context, command) {
        const {output} = context;

        this.printFirstLine(context, command);
        this.printCommandDescription(context, command);
        this.printCommandArguments(context, command);
        this.printCommandOptions(context, command);

        output.flush();
    }

    printFirstLine(context, command) {
        const {application, output} = context;
        const {args, name, options} = command;
        output.write('Usage:');
        output.write(` ${application.name}`);
        if (name !== '') {
            output.write(` ${name}`);
        }
        if (options.size > 0) {
            output.write(' [options]');
        }
        if (args.size > 0) {
            for (const argument of args.values()) {
                output.write(' ');
                this.printCommandArgumentLabel(context, argument);
            }
        }
        output.writeLine();
        output.flush();
    }

    printCommandDescription(context, command) {
        const {output} = context;
        const {description} = command;
        if (description) {
            output.writeLine();
            output.writeLine(description);
        }
        output.flush();
    }

    printCommandArguments(context, command) {
        const {output} = context;
        const {args} = command;
        if (args.size > 0) {
            output.writeLine();
            output.writeLine('Arguments:');
            for (const argument of args.values()) {
                this.printCommandArgument(context, argument);
            }
        }
    }

    printCommandArgumentLabel(context, argument) {
        const {output} = context;
        const {defaults, name, rest, required} = argument;
        let label = name;
        if (rest) {
            label += '...';
        }
        if (defaults && !rest) {
            label += `="${defaults.toString()}"`;
        }
        label = required ? `<${label}>` : `[${label}]`;
        output.write(label);
    }

    printCommandOptions(context, command) {
        const {output} = context;
        const {options} = command;

        if (options.size > 0) {
            output.writeLine();
            output.writeLine('Options:');
            for (const option of options.values()) {
                this.printCommandOption(context, option);
            }
        }
    }

    printCommandOptionParameterLabel(context, parameter) {
        const {output} = context;
        const {defaults, name, required} = parameter;
        let label = name;
        if (defaults) {
            label += `="${defaults}"`;
        }
        label = required ? `<${label}>` : `[${label}]`;
        output.write(label);
    }

    printCommandArgument(context, argument) {
        const {output} = context;
        output.write('  ');
        this.printCommandArgumentLabel(context, argument);
        output.tab();
        output.writeLine(argument.description);
    }

    printCommandOption(context, option) {
        const {output} = context;
        const {description, longFlags, parameter, shortFlags} = option;
        output.write('  ');
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
        output.write(flags.join(', '));
        if (parameter) {
            output.write('=');
            this.printCommandOptionParameterLabel(context, parameter);
        }
        if (description) {
            output.tab();
            output.write(`${description}`);
        }
        output.writeLine();
    }

    printCommands(context, commands) {
        const {output} = context;
        if (commands.size > 0) {
            output.writeLine();
            output.writeLine('Commands:');
            for (const command of commands.values()) {
                this.printCommand(context, command);
            }
        }
    }

    printCommand(context, command) {
        const {output} = context;
        const {name, hidden, description, options, args} = command;

        if (hidden) {
            return;
        }

        output.write(`  ${name}`);

        if (options.length > 0) {
            output.write(' [options]');
        }

        if (args.size > 0) {
            for (const argument of args.values()) {
                output.write(' ');
                this.printCommandArgumentLabel(context, argument);
            }
        }

        if (description) {
            output.tab();
            output.write(`${description}`);
        }

        output.writeLine();
    }
}
