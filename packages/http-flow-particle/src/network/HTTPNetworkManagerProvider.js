import {ServiceProvider} from 'acme-core-particle';
import {HTTPNetworkManager} from './HTTPNetworkManager';

export class HTTPNetworkManagerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const networkManager = new HTTPNetworkManager({serviceLocator});
        return networkManager;
    }
}
