import ConsoleCommand from '../define/ConsoleCommand';

export default class VersionCommand extends ConsoleCommand {

    constructor({version}) {
        super({
            aliases: ['show-version'],
            description: 'Show the current version of console app.',
            name: 'version',
        });
        this.version = version;
    }

    async execute(context) {
        context.stdout.write(this.version);
    }
}
