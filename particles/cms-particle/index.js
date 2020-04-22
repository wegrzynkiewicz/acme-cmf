/* eslint-disable no-process-env */

import {EnvironmentProvider, ParticleManager, ServiceLocator, Warden} from 'acme-core';
import {LoggerParticle} from 'acme-logger-particle';
import {CMSParticle} from './src/CMSParticle';

process.on('unhandledRejection', (error) => {
    throw error;
});

(async function bootstrap() {
    const serviceLocator = new ServiceLocator({});
    serviceLocator.registerProvider(new EnvironmentProvider({
        variables: {...process.env},
    }));

    const particleManager = new ParticleManager({serviceLocator});
    particleManager.registerParticle(new CMSParticle());
    particleManager.registerParticle(new LoggerParticle());

    const warden = new Warden({
        particleManager,
        serviceLocator,
    });

    await warden.bootstrap();
}());
