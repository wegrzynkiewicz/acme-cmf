import {createDebugger} from '@acme/debug';
import type {ServiceRegistry} from '@acme/service';
import {createServiceLocator} from '@acme/service';
import type {IncomingRequest} from './IncomingRequest';
import type {OutgoingResponse} from './OutgoingResponse';
import type {ProcessorInterface} from './ProcessorInterface';
import type {Server} from './Server';

const debug = createDebugger('http-base');

export class Network implements ProcessorInterface {

    public readonly name: string;
    public readonly processor: ProcessorInterface;
    public readonly serviceLocator: Record<string, unknown>;
    public readonly servers = new Map<string, Server>();

    public constructor(
        {name, serviceLocator, processor}: {
            name: string,
            serviceLocator: Record<string, unknown>,
            processor: ProcessorInterface,
        },
    ) {
        this.name = name;
        this.processor = processor;
        this.serviceLocator = serviceLocator;
    }

    public async process(
        serviceLocator: Record<string, unknown>,
        context: Record<string, unknown>,
    ): Promise<void> {
        await this.processor.process(serviceLocator, context);
    };

    public registerServer(server: Server): void {
        server.on('request', (request: IncomingRequest, response: OutgoingResponse) => {
            void this.processRequest(request, response);
        });
        this.servers.set(server.name, server);
        debug('HTTP server (%s) registered', server.name);
    }

    private async processRequest(
        request: IncomingRequest,
        response: OutgoingResponse,
    ): Promise<void> {
        const serviceLocator = createServiceLocator();
        const serviceRegistry = serviceLocator.serviceRegistry as ServiceRegistry;
        serviceRegistry.registerService('request', request);
        serviceRegistry.registerService('response', response);
    }
}
