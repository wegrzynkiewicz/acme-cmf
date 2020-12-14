import {ConsoleCommand} from '../define/ConsoleCommand';
import {HelpOption} from './HelpOption';

export class VersionCommand extends ConsoleCommand {

    constructor({copyright, intro, revision, version}) {
        super({
            aliases: ['show-version'],
            description: 'Show the current version of console application.',
            name: 'version',
            options: [
                new HelpOption(),
            ],
        });

        this.copyright = copyright;
        this.intro = intro;
        this.revision = revision;
        this.version = version;
    }

    async execute({output}) {
        const {version, copyright, intro, revision} = this;
        const string = `${intro} version ${version} revision ${revision} copyright ${copyright}`;
        output.writeLine(string);
    }
}
