import {ConsoleCommand} from '../define/ConsoleCommand';

export class VersionCommand extends ConsoleCommand {

    constructor({provide}) {
        super({
            aliases: ['show-version'],
            description: 'Show the current version of console app.',
            name: 'version',
        });
        this.provide = provide;
    }

    async execute(context) {
        const version = await this.provide();
        context.output.writeLine(version);
    }
}
