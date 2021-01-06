import {HTTPManager} from './HTTPManager';

export class HTTPBaseParticle {

    onPreInitServices({serviceRegistry}) {
        const httpManager = new HTTPManager();
        serviceRegistry.registerService('httpManager', httpManager);
    }

    onInitCommands({commander}) {

    }
}
