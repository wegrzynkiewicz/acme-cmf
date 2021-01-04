import {createDebugger} from '@acme/debug';
import {InputParser} from '../runtime/InputParser';
import {HelpOption} from '../embedded/HelpOption';
import {ConsoleArgument} from './ConsoleArgument';
import {ConsoleCommand} from './ConsoleCommand';
import type {Executable} from './Executable';

const debug = createDebugger('console:exec');

export class ConsoleApplication extends ConsoleCommand {

    private readonly serviceLocator: Record<string, unknown>;

    public constructor(
        {
            commandName,
            serviceLocator,
        }: {
            readonly commandName: string,
            readonly serviceLocator: Record<string, unknown>,
        },
    ) {
        super({
            args: [
                new ConsoleArgument({
                    defaults: commandName,
                    description: 'The command to execute.',
                    name: 'command',
                    required: false,
                }),
                new ConsoleArgument({
                    defaults: [],
                    description: 'The arguments to pass to command.',
                    name: 'arguments',
                    required: false,
                    rest: true,
                }),
            ],
            description: 'The main build in command which execute correct command.',
            hidden: true,
            name: 'main',
            options: [
                HelpOption.instance,
            ],
        });
        this.serviceLocator = serviceLocator;
    }

    public async executeCommand(
        {
            argv,
            command,
        }: {
            readonly argv: string,
            readonly command: ConsoleCommand,
        },
    ): Promise<number> {
        debug('Executing command (%s) with (%o)', command.name, argv);
        const {serviceLocator} = this;
        const parser = new InputParser({command});
        const {args, options} = parser.parse(argv);

        const middlewares: Executable[] = [...command.options.values(), command];

        function createNext(context: Record<string, unknown>) {
            return async function next(contextFromMiddleware: Record<string, unknown> = {}): Promise<number> {
                const middleware = middlewares.shift();
                if (middleware === undefined) {
                    return 1;
                }
                const next = createNext(context);
                const nextContext = {...context, ...contextFromMiddleware, next};
                const result = await middleware.execute(serviceLocator, nextContext);
                return result;
            };
        }

        const next = createNext({args, argv, command, options});
        const exitCode = await next();
        return exitCode;
    }

    public async execute(
        {commander}: { commander: ConsoleApplication },
        {args}: { args: Map<string, string> },
    ): Promise<number> {
        const commandName = args.get('command') ?? '';
        if (commandName === this.name) {
            throw new Error(`Cannot direct run a command named (${this.name}).`);
        }
        const argv = args.get('arguments') ?? '';
        const command = this.getCommandByName(commandName);
        const exitCode = await this.executeCommand({argv, command});
        return exitCode;
    }
}
