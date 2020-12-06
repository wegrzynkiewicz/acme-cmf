export class LogBus {

    constructor({handlers}) {
        this.handlers = [...handlers];
    }

    dispatch(log) {
        for (const handler of this.handlers) {
            handler.handle(log);
        }
    }
}
