/* eslint-disable no-process-env */

import {ServiceProvider} from '../dependency/ServiceProvider';
import {ParticleManager} from './ParticleManager';

export class ParticleManagerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const particleManager = new ParticleManager({serviceLocator});

        return particleManager;
    }
}
