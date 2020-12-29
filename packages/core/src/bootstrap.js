import {createServiceLocator} from '@acme/service';
import {Exit} from './Exit';
import {ParticleManager} from './ParticleManager';
import {StageManager} from './StageManager';

const stages = [
    'initParticle',
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
    const particleManager = new ParticleManager({particles, serviceLocator});
    const stageManager = new StageManager({particleManager, stages});
    const exit = new Exit();

    const run = async () => {
        await stageManager.run('initParticle');
        await stageManager.run('initConfig');
        await stageManager.run('initServices');
        await stageManager.run('initCommands');
        await stageManager.run('initSchemas');
        await stageManager.run('execute');
        return exit.getExitCode();
    };

    serviceRegistry.registerService({
        comment: 'Manage application stages.',
        key: 'stageManager',
        service: stageManager,
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
