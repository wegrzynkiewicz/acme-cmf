import {ServiceRegistry} from './ServiceRegistry';
import {ParticleManager} from './ParticleManager';

export function bootstrap({particles}) {
    const serviceLocator = Object.create(null);
    const serviceRegistry = new ServiceRegistry({serviceLocator});
    const particleManager = new ParticleManager({particles, serviceLocator});

    const get = (serviceName) => serviceLocator[serviceName];
    const run = async () => {
        await particleManager.run('setupParticle');
        await particleManager.run('setupConfig');
        await particleManager.run('setupServices');
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

    return serviceLocator;
}
