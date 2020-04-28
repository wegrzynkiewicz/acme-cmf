import {CoreParticle, ParticleManager, ServiceProvider} from 'acme-core-particle';
import {HTTPParticle} from 'acme-http-flow-particle';
import {LoggerParticle} from 'acme-logging-particle';
import {AppParticle} from './AppParticle';

export class ParticleManagerProvider extends ServiceProvider {

    constructor({process}) {
        super({
            name: 'particleManager',
        });
        this.process = process;
    }

    async provide(serviceLocator) {
        const particleManager = new ParticleManager({serviceLocator});

        particleManager.registerParticle(new CoreParticle({
            env: this.process.env,
        }));

        particleManager.registerParticle(new LoggerParticle({
            stderr: this.process.stderr,
            stdout: this.process.stdout,
        }));

        particleManager.registerParticle(new HTTPParticle());

        particleManager.registerParticle(new AppParticle());

        return particleManager;
    }
}
