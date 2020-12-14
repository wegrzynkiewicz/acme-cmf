import {ConsoleCommand} from '../define/ConsoleCommand';
import {HelpOption} from './HelpOption';

export class VersionCommand extends ConsoleCommand {

    constructor({copyright, intro, revision, version}) {
        super({
            aliases: ['show-version'],
            description: 'Show the current version of console app.',
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

    async execute(context) {
        const {version, copyright, intro, revision} = this;
        const output = `${intro} version ${version} revision ${revision} copyright ${copyright}\n`;
        context.output.writeLine(output);
    }
}
