import {DaemonManager, ServiceProvider} from 'acme-core';

export class DaemonManagerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const daemonManager = new DaemonManager({serviceLocator});
        return daemonManager;
    }
}
