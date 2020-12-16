import {createDebugger} from '@acme/debug';

const debug = createDebugger('service:registry');

function onTimeout(name, reject) {
    const error = new Error(`Cannot resolve (${name}).`);
    reject(error);
}

export class ServiceRegistry {

    constructor({serviceLocator}) {
        this.promises = new Map();
        this.resolvers = new Map();
        this.serviceLocator = serviceLocator;
        this.timeout = 100;
    }

    register({service, key}) {
        this.serviceLocator[key] = service;
        debug('Registered service (%s)', key);

        if (this.resolvers.has(key)) {
            const resolve = this.resolvers.get(key);
            resolve(service);
        }

        this.resolvers.delete(key);
        this.promises.delete(key);
    }

    async waitForService(serviceName) {
        const {[serviceName]: service} = this.serviceLocator;
        if (service !== undefined) {
            return await service;
        }

        if (this.promises.has(serviceName) === false) {
            const promise = new Promise((resolve, reject) => {
                this.resolvers.set(serviceName, resolve);
                if (isFinite(this.timeout)) {
                    setTimeout(onTimeout, this.timeout, serviceName, reject);
                }
            });
            this.promises.set(serviceName, promise);
        }

        return this.promises.get(serviceName);
    }
}
