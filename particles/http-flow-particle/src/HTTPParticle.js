import {Particle} from 'acme-core-particle';
import {name} from '../package';
import {HTTPServerManagerProvider} from './server/HTTPServerManagerProvider';

export class HTTPParticle extends Particle {

    constructor() {
        super({name});
    }

    async bootstrap(serviceLocator) {
        if (!serviceLocator.has('httpServerManager')) {
            const httpServerManagerProvider = new HTTPServerManagerProvider({
                name: 'httpServerManager',
            });
            serviceLocator.registerProvider(httpServerManagerProvider);
        }
    }
}
