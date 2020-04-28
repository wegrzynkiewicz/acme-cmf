import {Particle} from 'acme-core-particle';
import {name} from '../../package';

export class AppParticle extends Particle {

    constructor() {
        super({name});
    }

    async bootstrap(serviceLocator) {
        serviceLocator.wait('initializer').then((initializer) => {
            initializer.registerCallback(this.init.bind(this));
        });
    }

    async init(serviceLocator) {

        const loggerFactory = await serviceLocator.wait('loggerFactory');
        const logger = loggerFactory.produce({channel: 'sql'});
        logger.info('Started');

        const httpServerManager = await serviceLocator.wait('httpServerManager');
        const server = httpServerManager.createHTTPServer({
            name: 'app',
        });

        server.addListener('request', (request, response) => {
            response.end('hello world!');
        });

        server.listen(8080, '0.0.0.0');
    }
}
