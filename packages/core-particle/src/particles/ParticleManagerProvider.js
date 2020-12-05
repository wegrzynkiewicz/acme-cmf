import {ServiceProvider} from '../dependency/ServiceProvider';
import {ParticleManager} from './ParticleManager';

export class ParticleManagerProvider extends ServiceProvider {

    constructor() {
        super({
            name: 'particleManager',
        });
    }

    async provide(serviceLocator) {
        const particleManager = new ParticleManager({serviceLocator});
        return particleManager;
    }
}
