export class ParticleResourceCollector {

    constructor({particleName}) {
        this.particleName = particleName;
        this.serviceProviders = new Set();
    }

    registerServiceProvider(serviceProvider) {
        this.serviceProviders.add(serviceProvider);
    }
}
