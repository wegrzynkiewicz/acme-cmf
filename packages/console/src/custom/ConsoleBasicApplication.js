import * as Console from '../../index';
import InputParser from '../runtime/InputParser';

export default class ConsoleBasicApplication extends Console.Application {

    constructor({name, payload, provideLogo, provideVersion}) {
        super({name, payload});

        this.registerCommand(new Console.MainCommand({
            commandName: 'intro',
        }));
        this.registerCommand(new Console.IntroCommand({
            provide: provideLogo,
        }));
        this.registerCommand(new Console.VersionCommand({
            provide: provideVersion,
        }));
        this.registerCommand(new Console.HelpCommand());
        this.registerCommand(new Console.ListCommand());
    }

    registerCommand(command) {
        super.registerCommand(command);
    }

    async run({argv, stderr, stdin, stdout}) {
        const command = this.getCommandByName('main');
        const parser = new InputParser({command});
        const {args, options} = parser.parse(argv);
        const quiet = options.get('quiet');

        await super.run({
            argv,
            commandName: 'main',
            stderr: quiet ? new NullWriteableStream() : stderr,
            stdin,
            stdout: quiet ? new NullWriteableStream() : stdout,
        });

        return context;
    }
}
