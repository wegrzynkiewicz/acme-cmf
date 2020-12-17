import {ConsoleCommand, HelpOption} from '@acme/console';

export class ServerStartCommand extends ConsoleCommand {

    constructor() {
        super({
            description: 'Starts all listening server services.',
            name: 'start',
            options: [
                HelpOption.instance,
            ],
        });
    }

    async execute({stageManager, usagePrinter}, {argv, args}) {
        await stageManager.run('initRouting');
        await stageManager.run('listening');
        return 0;
    }
}
