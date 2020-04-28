export class Warden {

    constructor({particleManager, serviceLocator}) {
        this.particleManager = particleManager;
        this.serviceLocator = serviceLocator;
    }

    async init() {
        await this.particleManager.initParticles();
    }
}
