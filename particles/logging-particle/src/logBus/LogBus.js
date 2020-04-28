import {EventEmitter} from 'events';

export class LogBus extends EventEmitter {

    constructor() {
        super();
        this.handlers = new Set();
        this.setMaxListeners(Infinity);
    }

    registerHandler(handler) {
        this.handlers.add(handler);
    }

    unregisterHandler(handler) {
        this.handlers.delete(handler);
    }

    dispatch(log) {
        for (const handler of this.handlers.values()) {
            // Ignore promise
            handler.handle(log).then();
        }
        this.emit('log', log);
    }
}
