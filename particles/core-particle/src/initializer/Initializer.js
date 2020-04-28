export class Initializer {

    constructor({serviceLocator}) {
        this.serviceLocator = serviceLocator;
        this.callbacks = new Set();
    }

    registerCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Initialization parameter must be callback.');
        }
        this.callbacks.add(callback);
    }

    async run() {
        const promises = [];
        for (const callback of this.callbacks.values()) {
            this.callbacks.delete(callback);
            const promise = callback(this.serviceLocator);
            promises.push(promise);
        }
        await Promise.all(promises);
    }
}
