import {name} from '../../package';
import {DaemonRegistryProvider} from '../daemon/DaemonRegistryProvider';
import {EnvironmentProvider} from '../environment/EnvironmentProvider';
import {Particle} from '../particles/Particle';
import {ParticleInitiatorProvider} from '../particles/ParticleInitiatorProvider';
import {InitializerProvider} from '../initializer/InitializerProvider';
import {ParticleRegistryProvider} from '../particles/ParticleRegistryProvider';

export class CoreParticle extends Particle {

    constructor({env}) {
        super({name});
        this.env = env;
    }

    async prepare(serviceLocator) {

        if (!serviceLocator.has('initializer')) {
            const initializerProvider = new InitializerProvider({
                name: 'initializer',
            });
            serviceLocator.registerProvider(initializerProvider);
        }

        if (!serviceLocator.has('particleInitializer')) {
            const particleInitializerProvider = new ParticleInitiatorProvider({
                name: 'particleInitializer',
            });
            serviceLocator.registerProvider(particleInitializerProvider);
        }

        if (!serviceLocator.has('particleRegistry')) {
            const particleRegistryProvider = new ParticleRegistryProvider({
                name: 'particleRegistry',
            });
            serviceLocator.registerProvider(particleRegistryProvider);
        }

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
