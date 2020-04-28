import {Particle} from 'acme-core-particle';
import {LoggerParticle} from 'acme-logging-particle';
import {HTTPFlowParticle} from 'acme-http-flow-particle';
import {name} from '../../package';

export class AppParticle extends Particle {

    constructor() {
        super({name});
    }

    async prepare(serviceLocator) {
        const process = await serviceLocator.wait('process');
        const particleManager = await serviceLocator.wait('particleManager');

        particleManager.registerParticle(new LoggerParticle({
            stderr: process.stderr,
            stdout: process.stdout,
        }));

        particleManager.registerParticle(new HTTPFlowParticle());

        await particleManager.prepareParticles(serviceLocator);
    }

    async execute(serviceLocator) {
        const loggerFactory = await serviceLocator.wait('loggerFactory');
        const logger = loggerFactory.produce({channel: 'sql'});
        logger.info('Started');

        const httpServerManager = await serviceLocator.wait('httpServerManager');
        const server = httpServerManager.createHTTPServer({
            hostname: '0.0.0.0',
            name: 'app',
            port: 8080,
        });

        server.addListener('request', (request, response) => {
            response.end('hello world!');
        });

        await server.listen();
    }

    async finalize() {
        // Nothing
    }
}
