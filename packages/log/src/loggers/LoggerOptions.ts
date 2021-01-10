import type {LogBus} from '../logBus/LogBus';

export interface LoggerOptions {
    channel: string,
    logBus: LogBus,
    tags: string[],
}
