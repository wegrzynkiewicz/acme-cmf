import {IntroCommand} from './embedded/IntroCommand';
import {VersionCommand} from './embedded/VersionCommand';
import {HelpCommand} from './embedded/HelpCommand';
import {ListCommand} from './embedded/ListCommand';
import {UsagePrinter} from './runtime/UsagePrinter';
import {Output} from './runtime/Output';
import {ConsoleApplication} from './define/ConsoleApplication';

export class ConsoleParticle {

    constructor({argv, stderr, stdin, stdout}) {
        this.argv = argv;
        this.stdin = stdin;
        this.stderr = stderr;
        this.stdout = stdout;
    }

    onPreInitServices({serviceLocator, serviceRegistry}) {
        serviceRegistry.register({
            comment: 'Store all information about console commands.',
            key: 'console',
            service: new ConsoleApplication({
                commandName: 'intro',
                serviceLocator,
            }),
        });
    }

    onInitServices({serviceLocator, serviceRegistry}) {
        const {argv, stderr, stdout} = this;
        const executableName = argv[2];
        const output = new Output({stderr, stdout});

        serviceRegistry.register({
            comment: 'Helpful tool format console output.',
            key: 'output',
            service: output,
        });

        serviceRegistry.register({
            comment: 'Print console command help page.',
            key: 'usagePrinter',
            service: new UsagePrinter({executableName, output}),
        });
    }

    onPreInitConsoleCommands({console}) {
        const copyright = '2020';
        const intro = '@acme/console';
        const revision = '0000000';
        const version = '0.0.0';
        const logo = `${intro} version ${version} revision ${revision} copyright ${copyright}\n`;

        console.register(new IntroCommand({logo}));
        console.register(new VersionCommand({copyright, intro, revision, version}));
        console.register(new HelpCommand());
        console.register(new ListCommand());
    }

    async onExecute({console}) {
        await console.executeCommand({
            argv: this.argv.slice(3),
            command: console,
        });
    }
}
