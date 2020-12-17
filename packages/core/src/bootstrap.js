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

let exitCode = 0;
const setExitCode = (code) => {
    exitCode = code;
};

export function bootstrap({particles}) {
    const serviceLocator = Object.create(null);
    const serviceRegistry = new ServiceRegistry({serviceLocator});
    const particleManager = new ParticleManager({particles, serviceLocator});
    const stageManager = new StageManager({particleManager, stages});

    const get = (serviceName) => serviceLocator[serviceName];

    const run = async () => {
        await stageManager.run('initParticle');
        await stageManager.run('initConfig');
        await stageManager.run('initServices');
        await stageManager.run('initCommands');
        await stageManager.run('execute');
        return exitCode;
    };

    serviceRegistry.register({
        comment: 'Collect and manage access to service.',
        key: 'serviceRegistry',
        service: serviceRegistry,
    });
    serviceRegistry.register({
        comment: 'Stores application service instances.',
        key: 'serviceLocator',
        service: serviceLocator,
    });
    serviceRegistry.register({
        comment: 'Manage application stages.',
        key: 'stageManager',
        service: stageManager,
    });
    serviceRegistry.register({
        comment: 'Function which return service by name.',
        key: 'get',
        service: get,
    });
    serviceRegistry.register({
        comment: 'Manage application particle instances.',
        key: 'particleManager',
        service: particleManager,
    });
    serviceRegistry.register({
        comment: 'Function which allow run stages pipeline.',
        key: 'run',
        service: run,
    });
    serviceRegistry.register({
        comment: 'Function which can set and save exit code.',
        key: 'setExitCode',
        service: setExitCode,
    });

    return serviceLocator;
}
