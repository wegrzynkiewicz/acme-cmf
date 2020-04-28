import EventEmitter from 'events';

export class ServiceLocator extends EventEmitter {

    constructor({parent = null, timeout = Infinity}) {
        if (parent && !(parent instanceof ServiceLocator)) {
            throw new Error('Service locator parent must be instance of ServiceLocator class.');
        }
        super();
        this.parent = parent;
        this.promises = new Map();
        this.providers = new Map();
        this.resolvers = new Map();
        this.services = new Map();
        this.timeout = timeout;

        this.setMaxListeners(Infinity);
        if (this.parent) {
            this.parent.addListener('service-resolved', this.onServiceResolved.bind(this));
            this.parent.addListener('provider-registered', this.onProviderRegistered.bind(this));
        }
        this.set('serviceLocator', this);
    }

    complete(name, service) {
        if (this.resolvers.has(name)) {
            const resolve = this.resolvers.get(name);
            resolve(service);
        }
        this.services.set(name, service);
        this.emit('service-resolved', {name, service});
    }

    createChild() {
        const childServiceLocator = new ServiceLocator({
            parent: this,
            timeout: this.timeout,
        });
        return childServiceLocator;
    }

    get(name) {
        if (this.services.has(name)) {
            return this.services.get(name);
        }
        if (this.parent && this.parent.has(name)) {
            return this.parent.get(name);
        }
        throw new Error(`Cannot resolve service named (${name}).`);
    }

    has(name) {
        if (this.services.has(name)) {
            return true;
        }
        if (this.parent && this.parent.has(name)) {
            return true;
        }
        return false;
    }

    hasProvider(name) {
        if (this.providers.has(name)) {
            return true;
        }
        if (this.parent && this.parent.hasProvider(name)) {
            return true;
        }
        return false;
    }

    onProviderRegistered(serviceProvider) {
        const {name} = serviceProvider;
        if (this.providers.has(name)) {
            return;
        }
        if (this.resolvers.has(name)) {
            this.parent.triggerProviderByName(name).then();
        }
        this.emit('provider-registered', serviceProvider);
    }

    onServiceResolved(event) {
        const {name, service} = event;
        if (this.providers.has(name)) {
            return;
        }
        if (this.resolvers.has(name)) {
            const resolve = this.resolvers.get(name);
            resolve(service);
            this.promises.delete(name);
            this.resolvers.delete(name);
        }
        this.emit('service-resolved', event);
    }

    registerProvider(serviceProvider) {
        const {name} = serviceProvider;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Service provider name must be valid string.');
        }
        if (this.has(name)) {
            throw new Error(`Service named (${name}) already exists.`);
        }
        this.providers.set(name, serviceProvider);
        if (this.resolvers.has(name)) {
            this.triggerProviderByName(name).then();
        }
        this.emit('provider-registered', {name, serviceProvider});
    }

    async runProvider(serviceProvider) {
        this.registerProvider(serviceProvider);
        const service = await this.wait(serviceProvider.name);
        return service;
    }

    set(name, service) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Service name must be valid string.');
        }
        this.complete(name, service);
    }

    async triggerProviderByName(name) {
        if (this.providers.has(name)) {
            const provider = this.providers.get(name);
            const service = await provider.provide(this);
            this.complete(name, service);
            this.promises.delete(name);
            this.providers.delete(name);
            this.resolvers.delete(name);
        }
        if (this.parent) {
            await this.parent.triggerProviderByName(name);
        }
    }

    async wait(name) {
        if (this.hasProvider(name)) {
            await this.triggerProviderByName(name);
        }
        if (this.has(name)) {
            const service = this.get(name);
            return service;
        }
        if (this.promises.has(name)) {
            const promise = this.promises.get(name);
            return promise;
        }
        const promise = new Promise((resolve, reject) => {
            this.resolvers.set(name, resolve);
            if (isFinite(this.timeout)) {
                setTimeout(() => {
                    const error = new Error(`Cannot resolve (${name}).`);
                    reject(error);
                }, 400);
            }
        });
        this.promises.set(name, promise);
        return promise;
    }
}
