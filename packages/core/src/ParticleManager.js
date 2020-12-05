export class ParticleManager {

    constructor() {
        this.particles = new Set();
    }

    register(particle) {
        this.particles.add(particle);
    }
}
