import {Particle} from 'acme-core';
import {name} from '../package';
import {EnvironmentProvider} from './environment/EnvironmentProvider';
import {DaemonManagerProvider} from './daemon/DaemonManagerProvider';

export class CoreParticle extends Particle {

    constructor({env}) {
        super({name});
        this.env = env;
    }

    async bootstrap(serviceLocator) {
        const environmentProvider = new EnvironmentProvider({
            name: 'environment',
            variables: {...this.env},
        });
        serviceLocator.registerProvider(environmentProvider);

        const daemonManagerProvider = new DaemonManagerProvider({
            name: 'daemonProvider',
        });
        serviceLocator.registerProvider(daemonManagerProvider);
    }
}
