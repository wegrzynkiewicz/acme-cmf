import {ErrorHandler} from './network/ErrorHandler';
import {Network} from './network/Network';
import {Server} from './network/Server';
import {Proxy} from './network/Proxy';

export class HTTPNetworkParticle {

    constructor({name}) {
        this.name = name;
    }

    onInitConfig({configRegistry}) {
        const {name} = this;
        configRegistry.register({
            comments: `Hostname on which the server named (${name}) will listen.`,
            defaults: '0.0.0.0',
            key: `http.${name}.server.hostname`,
            type: 'ip',
        });
        configRegistry.register({
            comments: `Port on which the server named (${name}) will listen.`,
            defaults: 8000,
            key: `http.${name}.server.port`,
            type: 'port',
        });
    }

    onPreInitRouting({config, httpManager, loggerFactory, serviceLocator}) {
        const {name} = this;

        const proxy = new Proxy({
            name: `${name}.proxy`,
        });
        httpManager.registerProcessor(proxy);

        const logger = loggerFactory.produceLogger({channel: 'HTTP-ERROR'});
        const errorHandler = new ErrorHandler({
            logger: logger,
            name: `${name}.error-handler`,
            processor: proxy,
        });

        const network = new Network({
            name: `${name}.network`,
            processor: errorHandler,
            serviceLocator,
        });
        httpManager.registerProcessor(network);

        const server = new Server({
            hostname: config.get(`http.${name}.server.hostname`),
            name: `${name}.server`,
            port: config.get(`http.${name}.server.port`),
        });
        httpManager.registerProcessor(server);

        network.registerServer({server});
    }

    async onListening({httpManager}) {
        const {name} = this;
        const server = httpManager.getProcessor(`${name}.server`);
        await server.listenRequests();
    }
}
