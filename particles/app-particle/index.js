/* eslint-disable no-process-env */

import {ParticleManager, ServiceLocator, Warden} from 'acme-core';
import {LoggerParticle} from 'acme-logging-particle';
import {CoreParticle} from 'acme-core-particle';

process.on('unhandledRejection', (error) => {
    throw error;
});

(async function bootstrap() {
    const serviceLocator = new ServiceLocator({});
    const particleManager = new ParticleManager({serviceLocator});
    particleManager.registerParticle(new CoreParticle({
        env: process.env,
    }));
    particleManager.registerParticle(new LoggerParticle({
        stderr: process.stderr,
        stdout: process.stdout,
    }));

    const warden = new Warden({
        particleManager,
        serviceLocator,
    });

    await warden.init();

    const loggerFactory = await serviceLocator.wait('loggerFactory');
    const logger = loggerFactory.produce({channel: 'sql'});
}());
