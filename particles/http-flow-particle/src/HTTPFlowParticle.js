import {Particle} from 'acme-core-particle';
import {name} from '../package';
import {HTTPNetworkManagerProvider} from './network/HTTPNetworkManagerProvider';

export class HTTPFlowParticle extends Particle {

    constructor() {
        super({name});
    }

    async prepare(serviceLocator) {

        if (!serviceLocator.has('httpNetworkManager')) {
            const httpNetworkManagerProvider = new HTTPNetworkManagerProvider({
                name: 'httpNetworkManager',
            });
            serviceLocator.registerProvider(httpNetworkManagerProvider);
        }

    }

    async execute() {
        // Nothing
    }

    async finalize() {
        // Nothing
    }
}
