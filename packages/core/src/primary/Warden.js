export class Warden {

    constructor({particleManager, serviceLocator}) {
        this.particleManager = particleManager;
        this.serviceLocator = serviceLocator;
    }

    async init() {
        const particleResourceCollectors = await this.particleManager.initParticles();
        for (const collector of particleResourceCollectors.values()) {
            for (const serviceProvider of collector.serviceProviders.values()) {
                this.serviceLocator.registerProvider(serviceProvider);
            }
        }

    }
}
