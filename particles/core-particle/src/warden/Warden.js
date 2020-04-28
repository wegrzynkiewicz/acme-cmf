export class Warden {

    constructor({serviceLocator}) {
        this.serviceLocator = serviceLocator;
    }

    async init() {
        if (this.serviceLocator.has('particleManager')) {
            const particleManager = await this.serviceLocator.wait('particleManager');
            await particleManager.initParticles();
        }
        if (this.serviceLocator.has('daemonManager')) {
            const daemonManager = await this.serviceLocator.wait('daemonManager');
            await daemonManager.initDaemons();
        }
    }
}
