import {ServiceRegistry} from './ServiceRegistry';

export function createServiceLocator(): Record<string, unknown> {
    const serviceLocator: Record<string, unknown> = {};
    const serviceRegistry = new ServiceRegistry({serviceLocator});

    const get = <T>(serviceName: string): T => serviceLocator[serviceName] as T;

    serviceRegistry.registerService('serviceRegistry', serviceRegistry);
    serviceRegistry.registerService('serviceLocator', serviceLocator);
    serviceRegistry.registerService('context', serviceLocator);
    serviceRegistry.registerService('get', get);

    return serviceLocator;
}
