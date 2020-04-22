import EventEmitter from 'events';

export class ServiceLocator extends EventEmitter {

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
     * @private
     * @param {string} name
     * @param {any} service
     * @fires ServiceLocator#service-resolved
     */
    complete(name, service) {
        if (this.resolvers.has(name)) {
            const resolve = this.resolvers.get(name);
            resolve(service);
        }
        this.services.set(name, service);

        /**
         * @event ServiceLocator#service-resolved
         * @type object
         * @property {string} name
         * @property {any} service
         */
        this.emit('service-resolved', {name, service});
    }

    /**
     * @public
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
     * @public
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
     * @public
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
     * @private
     * @param {ServiceProvider} serviceProvider
     * @fires ServiceLocator#provider-registered
     */
    onProviderRegistered(serviceProvider) {
        const {name} = serviceProvider;
        if (this.providers.has(name)) {
            return;
        }
        if (this.resolvers.has(name)) {
            this.parent.runProvider(name).then();
        }

        /**
         * @event ServiceLocator#provider-registered
         * @type object
         * @property {string} name
         * @property {function(serviceLocator:ServiceLocator): Promise<any>} provide
         */
        this.emit('provider-registered', serviceProvider);
    }

    /**
     * @private
     * @param {object} event
     * @param {string} event.name
     * @param {any} event.service
     * @fires ServiceLocator#service-resolved
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
     * @public
     * @param {object} serviceProvider
     * @param {string} serviceProvider.name
     * @param {function(serviceLocator:ServiceLocator): Promise<any>} serviceProvider.provide
     * @fires ServiceLocator#provider-registered
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
     * @public
     * @param {string} name
     * @param {any} service
     */
    set(name, service) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Service name must be valid string.');
        }
        this.complete(name, service);
    }

    /**
     * @private
     * @param {string} name
     * @returns {Promise<void>}
     */
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
     * @public
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
