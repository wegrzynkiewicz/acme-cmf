import ConsoleCommand from '../define/ConsoleCommand';

export default class IntroCommand extends ConsoleCommand {

    constructor({provide}) {
        super({
            aliases: ['show-intro'],
            description: 'Show the intro of console application.',
            hidden: true,
            name: 'intro',
        });
        this.provide = provide;
    }

    async execute(context) {
        const {application, output, usagePrinter} = context;
        const command = application.getCommandByName('main');

        if (typeof this.provide === 'function') {
            const logo = await this.provide();
            output.writeLine(logo);
        }

        usagePrinter.writeHelp({
            ...command,
            commands: application.commands,
            description: '',
            name: '',
        });

        output.writeLine(`Type \`${application.name} help [command]\` for more information on specific commands.`);
        output.writeLine();

        return 0;
    }
}
