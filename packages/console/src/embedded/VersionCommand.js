import ConsoleCommand from '../define/ConsoleCommand';

export default class VersionCommand extends ConsoleCommand {

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
        context.output.flush();
    }
}
