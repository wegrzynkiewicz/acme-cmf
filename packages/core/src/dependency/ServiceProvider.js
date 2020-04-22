export class ServiceProvider {

    constructor({name}) {
        this.name = name;
    }

    async provide(serviceLocator) {
        throw new Error('Service provider must extends method named (provide).');
    }
}
