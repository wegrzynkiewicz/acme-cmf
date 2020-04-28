import {ServiceLocator} from '../dependency/ServiceLocator';
import {ParticleManagerProvider} from '../particles/ParticleManagerProvider';
import {CoreParticle} from './CoreParticle';

export class Application {

    constructor({serviceLocator}) {
        this.serviceLocator = serviceLocator;
    }

    async prepare() {
        const particleManager = await this.serviceLocator.wait('particleManager');
        await particleManager.prepareParticles();
    }

    async execute() {
        const particleManager = await this.serviceLocator.wait('particleManager');
        await particleManager.executeParticles();
    }

    async finalize() {
        const particleManager = await this.serviceLocator.wait('particleManager');
        await particleManager.finalizeParticles();
    }

    static async create({particle, process}) {
        const {env} = process;
        const serviceLocator = new ServiceLocator({timeout: 400});
        const particleManager = await serviceLocator.runProvider(new ParticleManagerProvider({}));
        const application = new Application({serviceLocator});
        serviceLocator.set('process', process);
        particleManager.registerParticle(particle);
        particleManager.registerParticle(new CoreParticle({env}));
        return application;
    }
}

