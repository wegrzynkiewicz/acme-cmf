import {ConsoleCommand} from '../define/ConsoleCommand';
import type {Output} from '../runtime/Output';
import {HelpOption} from './HelpOption';

export class VersionCommand extends ConsoleCommand {

    private readonly copyright: string;
    private readonly intro: string;
    private readonly revision: string;
    private readonly version: string;

    public constructor(
        {copyright, intro, revision, version}: {
            readonly copyright: string,
            readonly intro: string,
            readonly revision: string,
            readonly version: string,
        },
    ) {
        super({
            aliases: ['show-version'],
            description: 'Show the current version of console application.',
            name: 'version',
            options: [
                HelpOption.instance,
            ],
        });

        this.copyright = copyright;
        this.intro = intro;
        this.revision = revision;
        this.version = version;
    }

    public async execute(
        {output}: {
            readonly output: Output,
        },
    ): Promise<number> {
        const {version, copyright, intro, revision} = this;
        const string = `${intro} version ${version} revision ${revision} copyright ${copyright}`;
        output.writeLine(string);

        return 0;
    }
}
