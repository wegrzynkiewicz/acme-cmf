import {createServiceLocator} from '@acme/service';
import {ParticleManager} from './ParticleManager';

const stages = [
    'initParticles',
    'initConfig',
    'initServices',
    'initCommands',
    'initSchemas',
    'initRouting',
    'execute',
    'listening',
    'finalize',
];

export function bootstrap({particles}) {
    const {serviceLocator, serviceRegistry} = createServiceLocator();
    const particleManager = new ParticleManager({serviceLocator, stages});

    const run = async () => {
        for (const particle of particles) {
            await particleManager.registerParticle(particle);
        }
        await particleManager.run('initParticles');
        await particleManager.run('initConfig');
        await particleManager.run('initServices');
        await particleManager.run('initCommands');
        await particleManager.run('initSchemas');
        await particleManager.run('execute');
    };

    serviceRegistry.registerService('particleManager', particleManager);
    serviceRegistry.registerService('run', run);

    return serviceLocator;
}
