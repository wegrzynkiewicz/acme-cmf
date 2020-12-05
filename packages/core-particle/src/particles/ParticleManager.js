import {Particle} from './Particle';

export class ParticleManager {

    constructor({serviceLocator}) {
        this.particles = new Map();
        this.serviceLocator = serviceLocator;
    }

    async executeParticles() {
        const promises = [...this.particles.values()].map((particle) => particle.execute(this.serviceLocator));
        await Promise.all(promises);
    }

    async finalizeParticles() {
        const promises = [...this.particles.values()].map((particle) => particle.finalize(this.serviceLocator));
        await Promise.all(promises);
    }

    async registerParticle(particle) {
        if (!(particle instanceof Particle)) {
            throw new Error('Invalid particle instance.');
        }
        this.particles.set(particle.name, particle);
        await particle.prepare(this.serviceLocator);
    }
}
