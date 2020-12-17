import {createDebugger} from '@acme/debug';

const debug = createDebugger('http-server');

export class ErrorHandler {

    constructor({name, logger, processor}) {
        this.name = name;
        this.logger = logger;
        this.processor = processor;
    }

    async process(serviceLocator, context) {
        try {
            await this.processor.process(serviceLocator, context);
        } catch (error) {
            const {response} = context;
            response.statusCode = 500;
            response.end();
            debug('Cannot process request (%o)', error);
            this.logger.error('Cannot process request.', {error: error.stack});
        }
    }
}
