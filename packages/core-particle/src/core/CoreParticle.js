import {name} from '../../package';
import {DaemonRegistryProvider} from '../daemon/DaemonRegistryProvider';
import {EnvironmentProvider} from '../environment/EnvironmentProvider';
import {Particle} from '../particles/Particle';

export class CoreParticle extends Particle {

    constructor({env}) {
        super({name});
        this.env = env;
    }

    async prepare(serviceLocator) {

        if (!serviceLocator.has('environment')) {
            const environmentProvider = new EnvironmentProvider({
                name: 'environment',
                variables: {...this.env},
            });
            serviceLocator.registerProvider(environmentProvider);
        }

        if (!serviceLocator.has('daemonProvider')) {
            const daemonManagerProvider = new DaemonRegistryProvider({
                name: 'daemonProvider',
            });
            serviceLocator.registerProvider(daemonManagerProvider);
        }
    }

    async execute() {
        // Nothing
    }

    async finalize() {
        // Nothing
    }
}
