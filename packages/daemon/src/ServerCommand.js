import {AggregateCommand} from '@acme/console';

export class ServerCommand extends AggregateCommand {

    constructor() {
        super({
            description: 'Manage servers.',
            name: 'server',
        });
    }
}
