import {ServiceProvider} from '../dependency/ServiceProvider';
import {ParticleRegistry} from './ParticleRegistry';

export class ParticleRegistryProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const particleRegistry = new ParticleRegistry({serviceLocator});
        return particleRegistry;
    }
}
