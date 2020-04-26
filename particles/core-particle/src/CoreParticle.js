import {Particle} from 'acme-core';
import {name} from '../package';
import {EnvironmentProvider} from './environment/EnvironmentProvider';

export class CoreParticle extends Particle {

    constructor({env}) {
        super({name});
        this.env = env;
    }

    async bootstrap(particleResourceCollector) {
        const environmentProvider = new EnvironmentProvider({
            variables: {...this.env},
        });
        particleResourceCollector.registerServiceProvider(environmentProvider);
    }
}
