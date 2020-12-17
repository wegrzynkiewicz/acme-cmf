import {createDebugger} from '@acme/debug';
import {InputParser} from '../runtime/InputParser';
import {HelpOption} from '../embedded/HelpOption';
import {ConsoleArgument} from './ConsoleArgument';
import {ConsoleCommand} from './ConsoleCommand';

const debug = createDebugger('console:exec');

export class ConsoleApplication extends ConsoleCommand {

    constructor({commandName, serviceLocator}) {
        super({
            args: [
                new ConsoleArgument({
                    defaults: commandName,
                    description: 'The command to execute.',
                    name: 'command',
                    require: false,
                }),
                new ConsoleArgument({
                    defaults: [],
                    description: 'The arguments to pass to command.',
                    name: 'arguments',
                    require: false,
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

    async executeCommand({argv, command}) {
        debug('Executing command (%s) with (%o)', command.name, argv);
        const {serviceLocator} = this;
        const parser = new InputParser({command});
        const {args, options} = parser.parse(argv);

        const middlewares = [...command.options.values(), command];

        function createNext(context) {
            return async function next(contextFromMiddleware = {}) {
                if (middlewares.length > 0) {
                    const middleware = middlewares.shift();
                    const next = createNext(context);
                    const nextContext = {...context, ...contextFromMiddleware, next};
                    const result = await middleware.execute(serviceLocator, nextContext);
                    return result;
                }
                return null;
            };
        }

        const next = createNext({args, argv, command, options});
        const exitCode = await next();
        return exitCode;
    }

    async execute({commander}, {args}) {
        const commandName = args.get('command');
        if (commandName === this.name) {
            throw new Error(`Cannot direct run a command named (${this.name}).`);
        }
        const argv = args.get('arguments');
        const command = this.getCommandByName(commandName);
        const exitCode = await this.executeCommand({argv, command});
        return exitCode;
    }
}
