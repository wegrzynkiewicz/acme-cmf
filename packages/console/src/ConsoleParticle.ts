import type {Writable} from 'stream';
import type {ServiceRegistry} from '@acme/service';
import {ConsoleApplication} from './define/ConsoleApplication';
import {HelpCommand} from './embedded/HelpCommand';
import {IntroCommand} from './embedded/IntroCommand';
import {VersionCommand} from './embedded/VersionCommand';
import {Output} from './runtime/Output';
import {UsagePrinter} from './runtime/UsagePrinter';

export class ConsoleParticle {

    private readonly argv: string;
    private readonly stderr: Writable;
    private readonly stdin: Writable;
    private readonly stdout: Writable;
    private readonly setExitCode: (exitCode: number) => void;

    public constructor(
        {argv, setExitCode, stderr, stdin, stdout}: {
            argv: string,
            setExitCode: (exitCode: number) => void,
            stderr: Writable,
            stdin: Writable,
            stdout: Writable,
        },
    ) {
        this.argv = argv;
        this.setExitCode = setExitCode;
        this.stdin = stdin;
        this.stderr = stderr;
        this.stdout = stdout;
    }

    public async onPreInitServices(
        {serviceLocator, serviceRegistry}: {
            serviceLocator: Record<string, unknown>,
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const commander = new ConsoleApplication({
            commandName: 'intro',
            serviceLocator,
        });
        serviceRegistry.registerService('commander', commander);
    }

    public async onInitServices(
        {serviceRegistry}: {
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const {argv, stderr, stdout} = this;
        const executableName = argv[2];
        const output = new Output({stderr, stdout});

        const usagePrinter = new UsagePrinter({executableName, output});
        serviceRegistry.registerService('output', output);
        serviceRegistry.registerService('usagePrinter', usagePrinter);
    }

    public async onPreInitCommands(
        {commander}: {
            commander: ConsoleApplication,
        },
    ): Promise<void> {
        const copyright = '2020';
        const intro = '@acme/console';
        const revision = '0000000';
        const version = '0.0.0';
        const logo = `${intro} version ${version} revision ${revision} copyright ${copyright}\n`;

        commander.registerCommand(new IntroCommand({logo}));
        commander.registerCommand(new VersionCommand({copyright, intro, revision, version}));
        commander.registerCommand(new HelpCommand());
    }

    public async onExecute(
        {commander}: {
            commander: ConsoleApplication,
        },
    ): Promise<void> {
        const exitCode = await commander.executeCommand({
            argv: this.argv.slice(3),
            command: commander,
        });
        this.setExitCode(exitCode);
    }
}
