import type {LogBus} from '../logBus/LogBus';
import {Logger} from '../loggers/Logger';
import type {LoggerInterface} from '../loggers/LoggerInterface';
import type {LoggerOptions} from '../loggers/LoggerOptions';
import {NullLogger} from '../loggers/NullLogger';
import {LoggerFactory} from './LoggerFactory';

export function provideLoggerFactory(
    {config, logBus}: {
        config: Map<string, unknown>,
        logBus: LogBus,
    },
): LoggerFactory {
    const enabled = config.get('log.enabled') as boolean;
    const tags = config.get('log.tags') as string[];
    const constructor = enabled ? Logger : NullLogger;
    const create = (options: LoggerOptions): LoggerInterface => new constructor(options);
    const loggerFactory = new LoggerFactory({create, logBus, tags});

    return loggerFactory;
}
