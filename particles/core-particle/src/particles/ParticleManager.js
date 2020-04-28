import {Particle} from './Particle';

export class ParticleManager {

    constructor({serviceLocator}) {
        this.executedParticles = new WeakSet();
        this.finalizedParticles = new WeakSet();
        this.particles = new Map();
        this.preparedParticles = new WeakSet();
        this.serviceLocator = serviceLocator;
    }

    async make(set, callback) {
        const promises = [];
        for (const particle of this.particles.values()) {
            if (!set.has(particle)) {
                set.add(particle);
                const promise = callback(particle);
                promises.push(promise);
            }
        }
        await Promise.all(promises);
    }

    async prepareParticles() {
        await this.make(this.preparedParticles, (particle) => particle.prepare(this.serviceLocator));
    }

    async executeParticles() {
        await this.make(this.executedParticles, (particle) => particle.execute(this.serviceLocator));
    }

    async finalizeParticles() {
        await this.make(this.finalizedParticles, (particle) => particle.finalize(this.serviceLocator));
    }

    registerParticle(particle) {
        if (!(particle instanceof Particle)) {
            throw new Error('Invalid particle instance.');
        }
        this.particles.set(particle.name, particle);
    }
}
