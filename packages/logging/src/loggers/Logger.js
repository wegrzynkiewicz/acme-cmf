import {Log} from '../Log';

export class Logger {

    constructor({channel, logBus, tags}) {
        this.channel = channel === undefined ? '' : channel;
        this.logBus = logBus;
        this.tags = new Set(tags === undefined ? [] : tags);
    }

    log(severity, message, parameters = undefined) {
        const {channel, logBus, tags} = this;
        const log = new Log({
            channel,
            message,
            parameters,
            severity,
            tags,
        });
        logBus.dispatch(log);
    }

    emergency(message, parameters = undefined) {
        this.log(0, message, parameters);
    }

    alert(message, parameters = undefined) {
        this.log(1, message, parameters);
    }

    critical(message, parameters = undefined) {
        this.log(2, message, parameters);
    }

    error(message, parameters = undefined) {
        this.log(3, message, parameters);
    }

    warning(message, parameters = undefined) {
        this.log(4, message, parameters);
    }

    notice(message, parameters = undefined) {
        this.log(5, message, parameters);
    }

    info(message, parameters = undefined) {
        this.log(6, message, parameters);
    }

    debug(message, parameters = undefined) {
        this.log(7, message, parameters);
    }

    silly(message, parameters = undefined) {
        this.log(8, message, parameters);
    }
}
