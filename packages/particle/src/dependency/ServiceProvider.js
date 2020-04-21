/* eslint-disable no-unused-vars */

export default class ServiceProvider {

    /**
     * @param {string} name
     */
    constructor({name}) {
        this.name = name;
    }

    /**
     * @abstract
     * @param {ServiceLocator} serviceLocator
     * @returns {Promise<any>}
     */
    async provide(serviceLocator) {
        throw new Error('Service provider must extends method named (provide).');
    }
}
