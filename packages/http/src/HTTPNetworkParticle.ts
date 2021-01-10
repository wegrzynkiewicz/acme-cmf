import type {ConfigRegistry} from '@acme/config';
import type {LoggerFactory} from '@acme/log';
import type {HTTPManager} from './HTTPManager';
import {ErrorHandler} from './network/ErrorHandler';
import {Network} from './network/Network';
import {ProxyProcessor} from './network/ProxyProcessor';
import {Server} from './network/Server';

export class HTTPNetworkParticle {

    public readonly name: string;

    public constructor(
        {name}: {
            name: string,
        },
    ) {
        this.name = name;
    }

    public async onInitConfig(
        {configRegistry}: {
            configRegistry: ConfigRegistry,
        },
    ): Promise<void> {
        const {name} = this;
        configRegistry.registerEntry({
            comment: `Hostname on which the server named (${name}) will listen.`,
            defaults: '0.0.0.0',
            key: `http.${name}.server.hostname`,
            type: 'ip',
        });
        configRegistry.registerEntry({
            comment: `Port on which the server named (${name}) will listen.`,
            defaults: 8000,
            key: `http.${name}.server.port`,
            type: 'port',
        });
    }

    public async onPreInitRouting(
        {config, httpManager, loggerFactory, serviceLocator}: {
            config: Map<string, unknown>,
            httpManager: HTTPManager,
            loggerFactory: LoggerFactory,
            serviceLocator: Record<string, unknown>,
        },
    ): Promise<void> {
        const {name} = this;

        const proxy = new ProxyProcessor({
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

        const hostname = config.get(`http.${name}.server.hostname`) as string;
        const port = config.get(`http.${name}.server.port`) as number;
        const server = new Server({
            hostname,
            name: `${name}.server`,
            port,
        });
        network.registerServer(server);
    }

    public async onListening(
        {httpManager}: {
            httpManager: HTTPManager,
        },
    ): Promise<void> {
        const {name} = this;
        const network = httpManager.getProcessor(`${name}.network`) as Network;
        [...network.servers.values()].map(async (server: Server): Promise<void> => {
            await server.listenRequests();
        });
    }
}
