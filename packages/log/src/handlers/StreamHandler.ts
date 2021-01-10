import type {Writable} from 'stream';
import type {FilterInterface} from '../filters/FilterInterface';
import type {FormatterInterface} from '../formaters/FormatterInterface';
import type {Log} from '../Log';
import type {HandlerInterface} from './HandlerInterface';

export class StreamHandler implements HandlerInterface {
    private readonly filter: FilterInterface;
    private readonly formatter: FormatterInterface;
    private readonly stream: Writable;

    public constructor(
        {filter, formatter, stream}: {
            filter: FilterInterface,
            formatter: FormatterInterface,
            stream: Writable,
        },
    ) {
        this.filter = filter;
        this.formatter = formatter;
        this.stream = stream;
    }

    public handle(log: Log): void {
        if (this.filter.filtrate(log)) {
            const formattedLog = this.formatter.format(log);
            this.stream.write(formattedLog);
        }
    }
}
