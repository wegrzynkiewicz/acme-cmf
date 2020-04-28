import {name} from '../../package';
import {Particle} from 'acme-core-particle';

export class AppParticle extends Particle {

    constructor() {
        super({name});
    }

    async bootstrap(serviceLocator) {

    }
}
