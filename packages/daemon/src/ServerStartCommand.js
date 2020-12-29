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

    async execute({particleManager}) {
        await particleManager.run('initRouting');
        await particleManager.run('listening');
        return 0;
    }
}
