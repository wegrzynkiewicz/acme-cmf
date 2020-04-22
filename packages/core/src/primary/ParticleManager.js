import {Particle} from './Particle';

export class ParticleManager {

    constructor({serviceLocator}) {
        this.particles = new Map();
        this.serviceLocator = serviceLocator;
    }

    registerParticle(particle) {
        if (!(particle instanceof Particle)) {
            throw new Error('Invalid particle instance.');
        }
        this.particles.set(particle.name, particle);
    }
}
