import {createDebugger} from '@acme/debug';
import {IntroCommand} from './embedded/IntroCommand';
import {VersionCommand} from './embedded/VersionCommand';
import {HelpCommand} from './embedded/HelpCommand';
import {UsagePrinter} from './runtime/UsagePrinter';
import {Output} from './runtime/Output';
import {ConsoleApplication} from './define/ConsoleApplication';

const debug = createDebugger('console:exit');

export class ConsoleParticle {

    constructor({argv, stderr, stdin, stdout}) {
        this.argv = argv;
        this.stdin = stdin;
        this.stderr = stderr;
        this.stdout = stdout;
    }

    onPreInitServices({serviceLocator, serviceRegistry}) {
        const commander = new ConsoleApplication({
            commandName: 'intro',
            serviceLocator,
        });
        serviceRegistry.registerService({
            comment: 'Store all information about console commands.',
            key: 'commander',
            service: commander,
        });
    }

    onInitServices({serviceRegistry}) {
        const {argv, stderr, stdout} = this;
        const executableName = argv[2];
        const output = new Output({stderr, stdout});

        serviceRegistry.registerService({
            comment: 'Helpful tool format console output.',
            key: 'output',
            service: output,
        });

        serviceRegistry.registerService({
            comment: 'Print console command help page.',
            key: 'usagePrinter',
            service: new UsagePrinter({executableName, output}),
        });
    }

    onPreInitCommands({commander}) {
        const copyright = '2020';
        const intro = '@acme/console';
        const revision = '0000000';
        const version = '0.0.0';
        const logo = `${intro} version ${version} revision ${revision} copyright ${copyright}\n`;

        commander.registerCommand(new IntroCommand({logo}));
        commander.registerCommand(new VersionCommand({copyright, intro, revision, version}));
        commander.registerCommand(new HelpCommand());
    }

    async onExecute({commander, setExitCode}) {
        const exitCode = await commander.executeCommand({
            argv: this.argv.slice(3),
            command: commander,
        });
        debug('Console command exit code (%o)', exitCode);
        setExitCode(exitCode);
    }
}
