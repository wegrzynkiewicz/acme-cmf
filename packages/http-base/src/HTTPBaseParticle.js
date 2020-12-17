import {HTTPManager} from './HTTPManager';

export class HTTPBaseParticle {

    onPreInitServices({serviceRegistry}) {
        serviceRegistry.register({
            comment: 'Contain all information about http network entities.',
            key: 'httpManager',
            service: new HTTPManager(),
        });
    }

    onInitCommands({commander}) {

    }
}
