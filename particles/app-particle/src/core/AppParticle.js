import {Particle} from 'acme-core';
import {name} from '../../package';

export class AppParticle extends Particle {

    constructor() {
        super({name});
    }

    async bootstrap(serviceLocator) {
        const serviceLocator
    }
}
