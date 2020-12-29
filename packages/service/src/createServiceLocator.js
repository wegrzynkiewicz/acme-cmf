import {ServiceRegistry} from './ServiceRegistry';

export function createServiceLocator() {
    const serviceLocator = Object.create(null);
    const serviceRegistry = new ServiceRegistry({serviceLocator});

    const get = (serviceName) => serviceLocator[serviceName];

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
        comment: 'Function which return service by name.',
        key: 'get',
        service: get,
    });

    return serviceLocator;
}
