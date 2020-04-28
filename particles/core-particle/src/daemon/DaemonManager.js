import {Daemon} from './Daemon';

export class DaemonManager {

    constructor({serviceLocator}) {
        this.daemons = new Map();
        this.serviceLocator = serviceLocator;
    }

    async initDaemons() {
        const promises = [];
        for (const daemon of this.daemons.values()) {
            const promise = this.initDaemon(daemon);
            promises.push(promise);
        }
        await Promise.all(promises);
    }

    async initDaemon(daemon) {
        await daemon.bootstrap(this.serviceLocator);
    }

    registerDaemon(daemon) {
        if (!(daemon instanceof Daemon)) {
            throw new Error('Invalid daemon instance.');
        }
        this.daemons.set(daemon.name, daemon);
    }
}
