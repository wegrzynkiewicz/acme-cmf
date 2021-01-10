import type {Log} from '../Log';

export interface FormatterInterface {
    format: (log: Log) => string,
}
