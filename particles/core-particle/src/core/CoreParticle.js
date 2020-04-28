import {name} from '../../package';
import {DaemonManagerProvider} from '../daemon/DaemonManagerProvider';
import {EnvironmentProvider} from '../environment/EnvironmentProvider';
import {Particle} from '../particles/Particle';
import {ParticleManagerProvider} from '../particles/ParticleManagerProvider';
import {InitializerProvider} from '../initializer/InitializerProvider';

export class CoreParticle extends Particle {

    constructor({env}) {
        super({name});
        this.env = env;
    }

    async bootstrap(serviceLocator) {

        if (!serviceLocator.has('initializer')) {
            const initializerProvider = new InitializerProvider({
                name: 'initializer',
            });
            serviceLocator.provide(initializerProvider);
        }

        if (!serviceLocator.has('particleManager')) {
            const particleManagerProvider = new ParticleManagerProvider({
                name: 'particleManager',
            });
            serviceLocator.provide(particleManagerProvider);
        }

        if (!serviceLocator.has('environment')) {
            const environmentProvider = new EnvironmentProvider({
                name: 'environment',
                variables: {...this.env},
            });
            serviceLocator.registerProvider(environmentProvider);
        }

        if (!serviceLocator.has('daemonProvider')) {
            const daemonManagerProvider = new DaemonManagerProvider({
                name: 'daemonProvider',
            });
            serviceLocator.registerProvider(daemonManagerProvider);
        }
    }
}
