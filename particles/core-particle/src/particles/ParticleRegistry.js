import {Particle} from './Particle';

export class ParticleRegistry {

    constructor() {
        this.particles = new Map();
    }

    registerParticle(particle) {
        if (!(particle instanceof Particle)) {
            throw new Error('Invalid particle instance.');
        }
        this.particles.set(particle.name, particle);
    }
}
