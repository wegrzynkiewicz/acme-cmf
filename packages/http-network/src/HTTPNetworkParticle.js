import {ErrorHandler, Network, Router, Server} from '@acme/http-base';

export class HTTPNetworkParticle {

    constructor({name}) {
        this.name = name;
    }

    onInitConfig({configRegistry}) {
        const {name} = this;
        configRegistry.register({
            comments: 'Hostname on which the web server will listen.',
            defaults: '0.0.0.0',
            key: `http.${name}.server.hostname`,
            type: 'ip',
        });
        configRegistry.register({
            comments: 'Port on which the web server will listen.',
            defaults: 8000,
            key: `http.${name}.server.port`,
            type: 'port',
        });
    }

    onPreInitRouting({config, httpManager, loggerFactory, serviceLocator}) {
        const {name} = this;

        const router = new Router({
            name: `${name}.router`,
        });
        httpManager.register(router);

        const logger = loggerFactory.produce({channel: 'HTTP-ERROR'});
        const errorHandler = new ErrorHandler({
            logger: logger,
            name: `${name}.router`,
            processor: router,
        });

        const network = new Network({
            name: `${name}.network`,
            processor: errorHandler,
            serviceLocator,
        });
        httpManager.register(network);

        const server = new Server({
            hostname: config.get(`http.${name}.server.hostname`),
            name: `${name}.server`,
            port: config.get(`http.${name}.server.port`),
        });
        httpManager.register(server);

        network.registerServer({server});
    }

    async onListening({httpManager}) {
        const {name} = this;
        const server = httpManager.get(`${name}.server`);
        await server.listenRequests();
    }
}
