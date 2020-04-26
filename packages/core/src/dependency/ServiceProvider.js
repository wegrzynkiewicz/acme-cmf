export class ServiceProvider {

    constructor({name}) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Invalid service provider name.');
        }
        this.name = name;
    }

    async provide(serviceLocator) {
        throw new Error('Service provider must extends method named (provide).');
    }
}
