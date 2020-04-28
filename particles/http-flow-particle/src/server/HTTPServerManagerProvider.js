import {ServiceProvider} from 'acme-core-particle';
import {HTTPServerManager} from './HTTPServerManager';

export class HTTPServerManagerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const httpServerManager = new HTTPServerManager();
        return httpServerManager;
    }
}
