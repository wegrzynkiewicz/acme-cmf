import type {Log} from '../Log';

export interface FilterInterface {
    filtrate: (log: Log) => boolean,
}
