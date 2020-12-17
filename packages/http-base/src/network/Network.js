import {createDebugger} from '@acme/debug';

const debug = createDebugger('http-network');

export class Network {

    constructor({name, serviceLocator, processor}) {
        this.name = name;
        this.processor = processor;
        this.serviceLocator = serviceLocator;
        this.servers = new Set();
    }

    /**
     * @param {Server} server
     */
    registerServer({server}) {
        server.on('request', async (request, response) => {
            await this.processor.process(this.serviceLocator, {request, response});
        });
        this.servers.add(server);
        debug('HTTP server (%s) registered', server.name);
    }
}
