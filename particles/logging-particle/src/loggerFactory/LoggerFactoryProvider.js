import {ServiceProvider} from 'acme-core-particle';
import {Logger, NullLogger} from 'acme-logging';
import {LoggerFactory} from './LoggerFactory';

export class LoggerFactoryProvider extends ServiceProvider {

    async provide(serviceLocator) {
        const environment = await serviceLocator.wait('environment');
        const enabled = environment.get('ACME_LOGGING_ENABLED');
        const additionalTags = environment.get('ACME_LOGGING_ADDITIONAL_TAGS');
        const tagList = additionalTags.split(',').filter((tag) => tag.length > 0);
        const tags = new Set(tagList);
        const constructor = enabled === '1' ? Logger : NullLogger;
        const logBus = await serviceLocator.wait('logBus');
        const logger = new LoggerFactory({constructor, logBus, tags});

        return logger;
    }
}
