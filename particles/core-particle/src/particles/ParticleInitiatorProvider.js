import {ServiceProvider} from '../dependency/ServiceProvider';
import {ParticleInitiator} from './ParticleInitiator';

export class ParticleInitiatorProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const particleInitiator = new ParticleInitiator({serviceLocator});
        return particleInitiator;
    }
}
