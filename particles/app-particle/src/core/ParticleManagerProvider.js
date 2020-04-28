/* eslint-disable no-process-env */

import {CoreParticle, ParticleManager, ServiceProvider} from 'acme-core-particle';
import {LoggerParticle} from 'acme-logging-particle';
import {AppParticle} from './AppParticle';

export class ParticleManagerProvider extends ServiceProvider {

    constructor() {
        super({
            name: 'particleManager',
        });
    }

    async provide(serviceLocator) {
        const process = await serviceLocator.wait('process');
        const particleManager = new ParticleManager({serviceLocator});

        particleManager.registerParticle(new CoreParticle({
            env: process.env,
        }));

        particleManager.registerParticle(new LoggerParticle({
            stderr: process.stderr,
            stdout: process.stdout,
        }));

        particleManager.registerParticle(new AppParticle());

        return particleManager;
    }
}
