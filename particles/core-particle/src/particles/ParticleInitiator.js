export class ParticleInitiator {

    constructor({serviceLocator}) {
        this.initializedParticles = new WeakSet();
        this.serviceLocator = serviceLocator;
    }

    async initParticles(particles) {
        const promises = [];
        for (const particle of [...particles]) {
            const promise = this.initParticle(particle);
            promises.push(promise);
        }
        await Promise.all(promises);
    }

    async initParticle(particle) {
        if (!this.initializedParticles.has(particle)) {
            this.initializedParticles.add(particle);
            await particle.bootstrap(this.serviceLocator);
        }
    }
}
