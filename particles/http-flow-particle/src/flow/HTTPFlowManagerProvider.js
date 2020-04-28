import {ServiceProvider} from 'acme-core-particle';
import {HTTPFlowManager} from './HTTPFlowManager';

export class HTTPFlowManagerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const httpServerManager = new HTTPFlowManager({
            serviceLocator,
        });
        return httpServerManager;
    }
}
