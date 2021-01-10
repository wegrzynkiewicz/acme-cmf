import type {HTTPManager, ProcessorInterface} from '@acme/http';
import type {ServiceRegistry} from '@acme/service';
import {App} from './App';

export class AppResolverProcessor implements ProcessorInterface {

    public readonly name: string;
    private readonly httpManager: HTTPManager;

    public constructor(
        {httpManager, name}: {
            httpManager: HTTPManager,
            name: string,
        },
    ) {
        this.httpManager = httpManager;
        this.name = name;
    }

    public async process(
        {serviceLocator}: {
            serviceLocator: Record<string, unknown>,
        },
        {context, serviceRegistry}: {
            context: Record<string, unknown>,
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const app = new App(); // TODO: Get App from Repository
        serviceRegistry.registerService('app', app);

        if (app.processorName === undefined) {
            throw new Error('Cannot resolve App processor name.');
        }

        const processor = this.httpManager.getProcessor(app.processorName);
        await processor.process(serviceLocator, context);
    }
}
