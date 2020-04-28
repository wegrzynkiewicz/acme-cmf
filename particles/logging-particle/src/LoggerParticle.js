import {Particle} from 'acme-core-particle';
import {name} from '../package';
import {LogBusProvider} from './logBus/LogBusProvider';
import {LoggerFactoryProvider} from './loggerFactory/LoggerFactoryProvider';

export class LoggerParticle extends Particle {

    constructor({stderr, stdout}) {
        super({name});
        this.stderr = stderr;
        this.stdout = stdout;
    }

    async bootstrap(serviceLocator) {
        const logBusProvider = new LogBusProvider({
            name: 'logBus',
            stderr: this.stderr,
            stdout: this.stdout,
        });
        serviceLocator.registerProvider(logBusProvider);

        const loggerFactoryProvider = new LoggerFactoryProvider({
            name: 'loggerFactory',
        });
        serviceLocator.registerProvider(loggerFactoryProvider);
    }
}
