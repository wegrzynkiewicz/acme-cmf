export class Particle {

    constructor({name}) {
        this.name = name;
    }

    async prepare() {
        throw new Error(`Particle named (${this.name}) have not implemented method (prepare).`);
    }

    async execute() {
        throw new Error(`Particle named (${this.name}) have not implemented method (execute).`);
    }

    async finalize() {
        throw new Error(`Particle named (${this.name}) have not implemented method (finalize).`);
    }
}
