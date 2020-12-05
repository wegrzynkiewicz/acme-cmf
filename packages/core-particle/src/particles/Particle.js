export class Particle {

    constructor({name}) {
        this.name = name;
    }

    async prepare(serviceLocator) {
        throw new Error(`Particle named (${this.name}) have not implemented method (prepare).`);
    }

    async execute(serviceLocator) {
        throw new Error(`Particle named (${this.name}) have not implemented method (execute).`);
    }

    async finalize(serviceLocator) {
        throw new Error(`Particle named (${this.name}) have not implemented method (finalize).`);
    }
}
