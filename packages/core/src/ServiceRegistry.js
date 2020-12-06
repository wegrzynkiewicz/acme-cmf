import EventEmitter from 'events';

function onTimeout(name, reject) {
    const error = new Error(`Cannot resolve (${name}).`);
    reject(error);
}

export class ServiceRegistry extends EventEmitter {

    constructor({serviceLocator}) {
        super();
        this.setMaxListeners(Infinity);
        this.promises = new Map();
        this.resolvers = new Map();
        this.serviceLocator = serviceLocator;
        this.timeout = 100;
    }

    registerService(serviceName, serviceInstance) {
        this.serviceLocator[serviceName] = serviceInstance;

        if (this.resolvers.has(serviceName)) {
            const resolve = this.resolvers.get(serviceName);
            resolve(serviceInstance);
        }
        this.emit('service-registered', {serviceInstance, serviceName});

        this.resolvers.delete(serviceName);
        this.promises.delete(serviceName);
    }

    async waitForService(serviceName) {
        const {[serviceName]: service} = this.serviceLocator;
        if (service !== undefined) {
            return service;
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
