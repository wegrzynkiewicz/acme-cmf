import {Particle} from 'acme-core-particle';
import {name} from '../package';
import {HTTPFlowManagerProvider} from './flow/HTTPFlowManagerProvider';

export class HTTPFlowParticle extends Particle {

    constructor() {
        super({name});
    }

    async prepare(serviceLocator) {

        if (!serviceLocator.has('httpFlowManager')) {
            const httpFlowManagerProvider = new HTTPFlowManagerProvider({
                name: 'httpFlowManager',
            });
            serviceLocator.registerProvider(httpFlowManagerProvider);
        }

        if (!serviceLocator.has('httpServerManager')) {
            const httpServerManagerProvider = new HTTPFlowManagerProvider({
                name: 'httpServerManager',
            });
            serviceLocator.registerProvider(httpServerManagerProvider);
        }
    }

    async execute() {
        // Nothing
    }

    async finalize() {
        // Nothing
    }
}
