import {Particle} from 'acme-core-particle';
import {name} from '../../package';

export class AppParticle extends Particle {

    constructor() {
        super({name});
    }

    async bootstrap(serviceLocator) {
        const initializer = await serviceLocator.wait('initializer');
        initializer.registerCallback(async () => {
            const loggerFactory = await serviceLocator.wait('loggerFactory');
            const logger = loggerFactory.produce({channel: 'sql'});
            logger.info('Started');
        });
    }
}
