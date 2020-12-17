import {Logger} from '../loggers/Logger';
import {NullLogger} from '../loggers/NullLogger';
import {LoggerFactory} from './LoggerFactory';

export function provideLoggerFactory({config, logBus}) {
    const enabled = config.get('log.enabled');
    const additionalTags = config.get('log.tags');
    const tags = new Set(additionalTags);
    const constructor = enabled === true ? Logger : NullLogger;
    const create = (...args) => new constructor(...args);
    const loggerFactory = new LoggerFactory({create, logBus, tags});

    return loggerFactory;
}
