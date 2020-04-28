import {Application} from 'acme-core-particle';
import {AppParticle} from './src/core/AppParticle';

process.on('unhandledRejection', (error) => {
    throw error;
});

(async function bootstrap() {
    const particle = new AppParticle();
    const application = await Application.create({particle, process});
    await application.prepare();
    await application.execute();
    await application.finalize();
}());
