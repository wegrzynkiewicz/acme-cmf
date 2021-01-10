import type {Log} from '../Log';

export interface HandlerInterface {
    handle: (log: Log) => void,
}
