import {createDebugger} from '@acme/debug';
import {createServiceLocator} from '@acme/service';

const debug = createDebugger('http-base');

export class Network {

    constructor({name, serviceLocator, processor}) {
        this.name = name;
        this.processor = processor;
        this.serviceLocator = serviceLocator;
        this.servers = new Set();
    }

    registerServer({server}) {
        server.on('request', this.processRequest.bind(this));
        this.servers.add(server);
        debug('HTTP server (%s) registered', server.name);
    }

    async processRequest(request, response) {
        const {serviceRegistry, serviceLocator} = createServiceLocator();
        serviceRegistry.registerService('request', request);
        serviceRegistry.registerService('response', response);
        await this.processor.process(this.serviceLocator, serviceLocator);
    }
}
