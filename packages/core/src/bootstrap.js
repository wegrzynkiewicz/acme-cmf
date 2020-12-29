import {Exit} from './Exit';
import {ServiceRegistry} from './ServiceRegistry';
import {ParticleManager} from './ParticleManager';
import {StageManager} from './StageManager';

const stages = [
    'initParticle',
    'initConfig',
    'initServices',
    'initCommands',
    'initRouting',
    'execute',
    'listening',
    'finalize',
];

export function bootstrap({particles}) {
    const serviceLocator = Object.create(null);
    const serviceRegistry = new ServiceRegistry({serviceLocator});
    const particleManager = new ParticleManager({particles, serviceLocator});
    const stageManager = new StageManager({particleManager, stages});
    const exit = new Exit();

    const get = (serviceName) => serviceLocator[serviceName];

    const run = async () => {
        await stageManager.run('initParticle');
        await stageManager.run('initConfig');
        await stageManager.run('initServices');
        await stageManager.run('initCommands');
        await stageManager.run('execute');
        return exit.getExitCode();
    };

    serviceRegistry.registerService({
        comment: 'Collect and manage access to service.',
        key: 'serviceRegistry',
        service: serviceRegistry,
    });
    serviceRegistry.registerService({
        comment: 'Stores application service instances.',
        key: 'serviceLocator',
        service: serviceLocator,
    });
    serviceRegistry.registerService({
        comment: 'Manage application stages.',
        key: 'stageManager',
        service: stageManager,
    });
    serviceRegistry.registerService({
        comment: 'Function which return service by name.',
        key: 'get',
        service: get,
    });
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
