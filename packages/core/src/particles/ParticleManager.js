import {Particle} from './Particle';
import {ParticleResourceCollector} from './ParticleResourceCollector';

export class ParticleManager {

    constructor() {
        this.particles = new Map();
    }

    async initParticles() {
        const promises = [];
        for (const particle of this.particles.values()) {
            const promise = this.initParticle(particle);
            promises.push(promise);
        }
        const particleResourceCollectors = await Promise.all(promises);
        const particleResourceCollectorMap = new Map();
        for (const collector of particleResourceCollectors) {
            particleResourceCollectorMap.set(collector.particleName, collector);
        }
        return particleResourceCollectorMap;
    }

    async initParticle(particle) {
        const particleResourceCollector = new ParticleResourceCollector({
            particleName: particle.name,
        });
        await particle.bootstrap(particleResourceCollector);
        return particleResourceCollector;
    }

    registerParticle(particle) {
        if (!(particle instanceof Particle)) {
            throw new Error('Invalid particle instance.');
        }
        this.particles.set(particle.name, particle);
    }
}
