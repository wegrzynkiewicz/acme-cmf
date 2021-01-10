import type {LogBus} from '../logBus/LogBus';
import type {LoggerInterface} from '../loggers/LoggerInterface';
import type {LoggerOptions} from '../loggers/LoggerOptions';

export class LoggerFactory {
    private readonly create: (options: LoggerOptions) => LoggerInterface;
    private readonly logBus: LogBus;
    private readonly tags: string[];

    public constructor(
        {create, logBus, tags}: {
            create: (options: LoggerOptions) => LoggerInterface,
            logBus: LogBus,
            tags: string[],
        },
    ) {
        this.create = create;
        this.logBus = logBus;
        this.tags = tags;
    }

    public produceLogger(
        {channel}: {
            channel: string,
        },
    ): LoggerInterface {
        const {create, logBus, tags} = this;
        return create({channel, logBus, tags});
    }
}
