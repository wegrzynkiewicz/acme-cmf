import {Particle} from './Particle';

export class ParticleManager {

    constructor({serviceLocator}) {
        this.particles = new Map();
        this.serviceLocator = serviceLocator;
    }

    async initParticles() {
        const promises = [];
        for (const particle of this.particles.values()) {
            const promise = this.initParticle(particle);
            promises.push(promise);
        }
        await Promise.all(promises);
    }

    async initParticle(particle) {
        await particle.bootstrap(this.serviceLocator);
    }

    registerParticle(particle) {
        if (!(particle instanceof Particle)) {
            throw new Error('Invalid particle instance.');
        }
        this.particles.set(particle.name, particle);
    }
}
