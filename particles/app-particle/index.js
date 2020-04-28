import {ServiceLocator} from 'acme-core-particle';
import {ParticleManagerProvider} from './src/core/ParticleManagerProvider';

process.on('unhandledRejection', (error) => {
    throw error;
});

(async function bootstrap() {
    const serviceLocator = new ServiceLocator({timeout: 400});
    const particleManagerProvider = new ParticleManagerProvider({process});
    const particleManager = await serviceLocator.provide(particleManagerProvider);
    await particleManager.initParticles();
    const initializer = await serviceLocator.wait('initializer');
    await initializer.run();
}());
