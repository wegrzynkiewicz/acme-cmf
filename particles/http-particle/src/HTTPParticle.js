import {Particle} from 'acme-core';
import {name} from '../package';

export class HTTPParticle extends Particle {

    constructor() {
        super({name});
    }

    async bootstrap(serviceLocator) {
    }
}
