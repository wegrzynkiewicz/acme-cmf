import {createServiceLocator} from '@acme/service';
import {Exit} from './Exit';
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
    const exit = new Exit();

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
        return exit.getExitCode();
    };

    serviceRegistry.registerService({
        comment: 'Manage application particle instances.',
        key: 'particleManager',
        service: particleManager,
    });
    serviceRegistry.registerService({
        comment: 'Function which allow run stages pipeline.',
        key: 'run',
        service: run,
    });
    serviceRegistry.registerService({
        comment: 'Function which can set and save exit code.',
        key: 'exit',
        service: exit,
    });

    return serviceLocator;
}
