import type {ParticleInterface, ServiceRegistry} from '@acme/service';
import {createServiceLocator, ParticleManager} from '@acme/service';

const stages = new Set<string>([
    'initParticles',
    'initConfig',
    'initServices',
    'initCommands',
    'initSchemas',
    'initUnitBlueprints',
    'initRouting',
    'execute',
    'listening',
    'finalize',
]);

export function bootstrap(
    {particles}: {
        particles: ParticleInterface[],
    },
): Record<string, unknown> {
    const serviceLocator = createServiceLocator();
    const serviceRegistry = serviceLocator.serviceRegistry as ServiceRegistry;
    const particleManager = new ParticleManager({serviceLocator, stages});

    const run = async (): Promise<void> => {
        for (const particle of particles) {
            await particleManager.registerParticle(particle);
        }
        await particleManager.run('initParticles');
        await particleManager.run('initConfig');
        await particleManager.run('initServices');
        await particleManager.run('initCommands');
        await particleManager.run('initSchemas');
        await particleManager.run('initUnitBlueprints');
        await particleManager.run('execute');
    };

    serviceRegistry.registerService('particleManager', particleManager);
    serviceRegistry.registerService('run', run);

    return serviceLocator;
}
