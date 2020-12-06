import {ServiceRegistry} from './ServiceRegistry';
import {ParticleManager} from './ParticleManager';
import {EventManager} from './EventManager';
import {StageManager} from './StageManager';

function createStageManager() {
    const stageManager = new StageManager();
    stageManager.createStage('system-start');
    stageManager.createStage('environment-setup');
    stageManager.createStage('service-creation');
    stageManager.createStage('command-execution');
    stageManager.createStage('system-shutdown');
    return stageManager;
}

export function bootstrap({particles}) {
    const serviceLocator = Object.create(null);
    const serviceRegistry = new ServiceRegistry({serviceLocator});
    const stageManager = createStageManager();

    serviceRegistry.registerService('eventManager', new EventManager());
    serviceRegistry.registerService('get', (serviceName) => serviceLocator[serviceName]);
    serviceRegistry.registerService('particleManager', new ParticleManager());
    serviceRegistry.registerService('serviceLocator', serviceLocator);
    serviceRegistry.registerService('serviceRegistry', serviceRegistry);
    serviceRegistry.registerService('stageManager', stageManager);
    serviceRegistry.registerService('run', () => stageManager.run(serviceLocator));

    particles.map((particle) => particle.bootstrap(serviceLocator));

    return serviceLocator;
}
