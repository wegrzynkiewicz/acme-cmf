import {EventEmitter} from 'events';

export class LogBus extends EventEmitter {

    dispatch(log) {
        this.emit('log', log);
    }
}
