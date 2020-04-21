export default class ServiceLocator {

    /**
     * @param {string} name
     * @param {ServiceLocator?} parent
     */
    constructor({name, parent = null}) {
        if (parent && !(parent instanceof ServiceLocator)) {
            throw new Error('Service locator parent must be instance of ServiceLocator class.');
        }
        this.name = name;
        this.parent = parent;
        this.promises = new Map();
        this.providers = new Map();
        this.resolvers = new Map();
        this.services = new Map();
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
        this.promises.delete(name);
        this.providers.delete(name);
        this.resolvers.delete(name);
        this.services.set(name, service);
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

    getPromise() {
        if (this.promises.hasPromise(name)) {
            return this.promises.get(name);
        }
        if (this.parent && this.parent.hasPromise(name)) {
            return this.parent.getPromise(name);
        }
        throw new Error(`Promise named (${name}) not exists.`);
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

    hasPromise(name) {
        if (this.promises.has(name)) {
            return true;
        }
        if (this.parent && this.parent.hasPromise(name)) {
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

    hasResolver(name) {
        if (this.resolvers.has(name)) {
            return true;
        }
        if (this.parent && this.parent.hasResolver(name)) {
            return true;
        }
        return false;
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
        if (this.hasProvider(name)) {
            throw new Error(`Service named (${name}) already registered.`);
        }
        this.providers.set(name, serviceProvider);
        this.triggerProvider(name).then();
    }

    registerResolver(name, resolve) {
        if (this.has(name)) {
            throw new Error(`Service named (${name}) already exists.`);
        }
        if (this.hasResolver(name)) {
            throw new Error(`Resolver named (${name}) already exists.`);
        }
        this.resolvers.set(name, resolve);
        if (this.parent) {
            this.parent.registerResolver(name, resolve);
        }
        this.triggerProvider(name).then();
    }

    /**
     * @param {string} name
     * @param {any} service
     */
    set(name, service) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Service name must be valid string.');
        }
        if (this.services.has(name)) {
            throw new Error(`Service named (${name}) already exists.`);
        }
        this.complete(name, service);
    }

    async triggerProvider(name) {
        if (this.providers.has(name)) {
            const provider = this.providers.get(name);
            const service = await provider.provide(this);
            this.complete(name, service);
        }
        if (this.parent) {
            await this.parent.triggerProvider(name);
        }
    }

    /**
     * @param {string} name
     * @returns {Promise<any>}
     */
    async wait(name) {
        if (this.hasProvider(name)) {
            await this.triggerProvider(name);
        }
        if (this.has(name)) {
            const service = this.get(name);
            return Promise.resolve(service);
        }
        if (this.hasPromise(name)) {
            const promise = this.getPromise(name);
            return promise;
        }
        const promise = new Promise((resolve) => {
            this.registerResolver(name, resolve);
        });
        this.promises.set(name, promise);
        return promise;
    }
}
