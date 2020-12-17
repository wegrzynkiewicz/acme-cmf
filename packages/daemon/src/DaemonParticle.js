import {ServerCommand} from './ServerCommand';
import {ServerStartCommand} from './ServerStartCommand';

export class DaemonParticle {

    onInitCommands({commander}) {
        const server = new ServerCommand();
        server.registerCommand(new ServerStartCommand());
        commander.registerCommand(server);
    }
}
