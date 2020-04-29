import {Particle} from 'acme-core-particle';
import {LoggerParticle} from 'acme-logging-particle';
import {HTTPFlowParticle, Network, Route, Router, Server, StrictFirstSegment} from 'acme-http-flow-particle';
import {name} from '../../package';
import {MainController} from './MainController';

export class AppParticle extends Particle {

    constructor() {
        super({name});
    }

    async prepare(serviceLocator) {
        const process = await serviceLocator.wait('process');
        const particleManager = await serviceLocator.wait('particleManager');

        await Promise.all([
            particleManager.registerParticle(new LoggerParticle({
                stderr: process.stderr,
                stdout: process.stdout,
            })),

            particleManager.registerParticle(new HTTPFlowParticle()),
        ]);
    }

    async execute(serviceLocator) {
        const loggerFactory = await serviceLocator.wait('loggerFactory');
        const logger = loggerFactory.produce({channel: 'sql'});
        logger.info('Started');

        const httpNetworkManager = await serviceLocator.wait('httpNetworkManager');

        const server = new Server({
            hostname: '0.0.0.0',
            name: 'app-server',
            port: 8080,
        });

        const controller = new MainController({
            name: 'app-main-controller',
        });

        const router = new Router({
            name: 'app-main-router',
        });

        const route = new Route({
            conditions: [
                new StrictFirstSegment('admin'),
            ],
            name: 'app-only-once-route',
            processor: controller,
        });

        router.registerRoute(route);

        const network = new Network({
            name: 'app-network',
            processor: router,
            server,
            serviceLocator,
        });

        httpNetworkManager.registerNetwork(network);

        await server.listen();
    }

    async finalize() {
        // Nothing
    }
}
