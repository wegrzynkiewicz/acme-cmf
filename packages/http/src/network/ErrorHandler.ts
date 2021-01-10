import {createDebugger} from '@acme/debug';
import type {LoggerInterface} from '@acme/log';
import type {OutgoingResponse} from './OutgoingResponse';
import type {ProcessorInterface} from './ProcessorInterface';

const debug = createDebugger('http-base');

export class ErrorHandler implements ProcessorInterface {

    public readonly name: string;
    private readonly logger: LoggerInterface;
    private readonly processor: ProcessorInterface;

    public constructor(
        {name, logger, processor}: {
            name: string,
            logger: LoggerInterface,
            processor: ProcessorInterface,
        },
    ) {
        this.name = name;
        this.logger = logger;
        this.processor = processor;
    }

    public async process(
        serviceLocator: Record<string, unknown>,
        {context, response}: {
            context: Record<string, unknown>,
            response: OutgoingResponse,
        },
    ): Promise<void> {
        try {
            await this.processor.process(serviceLocator, context);
        } catch (error: unknown) {
            response.statusCode = 500;
            response.end();
            if (error instanceof Error) {
                debug('Cannot process request (%o)', error);
                this.logger.error('Cannot process request.', {error: error.stack});
            }
        }
    }
}
