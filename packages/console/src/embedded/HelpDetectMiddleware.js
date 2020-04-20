import ConsoleMiddleware from '../define/ConsoleMiddleware';

export default class HelpDetectMiddleware extends ConsoleMiddleware {

    async execute(context, next) {
        const {application, input, output} = context;
        if (input.options.get('help')) {
            application.run({
                ...this.resolveArguments(context),
                stderr: output.stderr,
                stdin: input.stdin,
                stdout: output.stdout,
            });
            return 0;
        }
        const exitCode = await super.execute(context, next);
        return exitCode;
    }

    resolveArguments(context) {
        const {command} = context;
        if (command.name === 'main') {
            return {
                argv: [],
                commandName: 'intro',
            };
        }
        return {
            argv: [command.name],
            commandName: 'help',
        };
    }
}
