import EventEmitter from 'events';

export default class ServiceLocator extends EventEmitter {

    /**
     * @param {string} name
     * @param {ServiceLocator?} parent
     */
    constructor({name, parent = null}) {
        if (parent && !(parent instanceof ServiceLocator)) {
            throw new Error('Service locator parent must be instance of ServiceLocator class.');
        }
        super();
        this.name = name;
        this.parent = parent;
        this.promises = new Map();
        this.providers = new Map();
        this.resolvers = new Map();
        this.services = new Map();

        this.setMaxListeners(Infinity);
        if (this.parent) {
            this.parent.addListener('service-resolved', this.onServiceResolved.bind(this));
            this.parent.addListener('provider-registered', this.onProviderRegistered.bind(this));
        }
    }

    /**
     * @param {string} name
     * @param {any} service
     */
    complete(name, service) {
        if (this.resolvers.has(name)) {
            const resolve = this.resolvers.get(name);
            resolve(service);
        }
        this.services.set(name, service);
        this.emit('service-resolved', {name, service});
    }

    /**
     * @param {string} name
     * @returns {any}
     */
    get(name) {
        if (this.services.has(name)) {
            return this.services.get(name);
        }
        if (this.parent && this.parent.has(name)) {
            return this.parent.get(name);
        }
        throw new Error(`Cannot resolve service named (${name}).`);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    has(name) {
        if (this.services.has(name)) {
            return true;
        }
        if (this.parent && this.parent.has(name)) {
            return true;
        }
        return false;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    hasProvider(name) {
        if (this.providers.has(name)) {
            return true;
        }
        if (this.parent && this.parent.hasProvider(name)) {
            return true;
        }
        return false;
    }

    /**
     * @param {ServiceProvider} serviceProvider
     */
    onProviderRegistered(serviceProvider) {
        const {name} = serviceProvider;
        if (this.providers.has(name)) {
            return;
        }
        if (this.resolvers.has(name)) {
            this.parent.runProvider(name).then();
        }
        this.emit('provider-registered', serviceProvider);
    }

    /**
     * @param {object} event
     * @param {string} event.name
     * @param {any} event.service
     */
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

    /**
     * @param {object} serviceProvider
     * @param {string} serviceProvider.name
     * @param {function(serviceLocator:ServiceLocator): Promise<any>} serviceProvider.provide
     */
    registerProvider(serviceProvider) {
        const {name} = serviceProvider;
        if (this.has(name)) {
            throw new Error(`Service named (${name}) already exists.`);
        }
        this.providers.set(name, serviceProvider);
        if (this.resolvers.has(name)) {
            this.runProvider(name).then();
        }
        this.emit('provider-registered', {name, serviceProvider});
    }

    /**
     * @param {string} name
     * @param {any} service
     */
    set(name, service) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Service name must be valid string.');
        }
        this.complete(name, service);
    }

    async runProvider(name) {
        if (this.providers.has(name)) {
            const provider = this.providers.get(name);
            const service = await provider.provide(this);
            this.complete(name, service);
            this.promises.delete(name);
            this.providers.delete(name);
            this.resolvers.delete(name);
        }
        if (this.parent) {
            await this.parent.runProvider(name);
        }
    }

    /**
     * @param {string} name
     * @returns {Promise<any>}
     */
    async wait(name) {
        if (this.hasProvider(name)) {
            await this.runProvider(name);
        }
        if (this.has(name)) {
            const service = this.get(name);
            return Promise.resolve(service);
        }
        if (this.promises.has(name)) {
            const promise = this.promises.get(name);
            return promise;
        }
        const promise = new Promise((resolve) => {
            this.resolvers.set(name, resolve);
        });
        this.promises.set(name, promise);
        return promise;
    }
}
