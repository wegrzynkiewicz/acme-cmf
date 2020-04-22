import {ConsoleApplication} from '../define/ConsoleApplication';
import {ConsoleOption} from '../define/ConsoleOption';
import {HelpCommand} from '../embedded/HelpCommand';
import {HelpDetectMiddleware} from '../embedded/HelpDetectMiddleware';
import {IntroCommand} from '../embedded/IntroCommand';
import {ListCommand} from '../embedded/ListCommand';
import {MainCommand} from '../embedded/MainCommand';
import {QuietDetectMiddleware} from '../embedded/QuietDetectMiddleware';
import {VersionCommand} from '../embedded/VersionCommand';

export class ConsoleBasicApplication extends ConsoleApplication {

    constructor({name, payload, provideLogo, provideVersion}) {
        super({name, payload});

        this.registerCommand(new MainCommand({
            commandName: 'intro',
        }));
        this.registerCommand(new IntroCommand({
            provide: provideLogo,
        }));
        this.registerCommand(new VersionCommand({
            provide: provideVersion,
        }));
        this.registerCommand(new HelpCommand());
        this.registerCommand(new ListCommand());

        this.registerMiddleware(new QuietDetectMiddleware());
        this.registerMiddleware(new HelpDetectMiddleware());
    }

    registerCommand(command) {
        const helpOption = new ConsoleOption({
            defaults: false,
            description: 'Show the help information about this command.',
            longFlags: ['help'],
            name: 'help',
            shortFlags: ['h'],
        });
        command.registerOption(helpOption);

        const quietOption = new ConsoleOption({
            defaults: false,
            description: 'Do not output any message.',
            longFlags: ['quiet'],
            name: 'quiet',
            shortFlags: ['q'],
        });
        command.registerOption(quietOption);

        super.registerCommand(command);
    }
}
