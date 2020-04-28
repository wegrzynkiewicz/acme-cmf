import {ServiceProvider} from '../dependency/ServiceProvider';
import {DaemonManager} from './DaemonManager';

export class DaemonManagerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const daemonManager = new DaemonManager({serviceLocator});

        this.serviceLocator.wait('initializer').then((initializer) => {
            initializer.registerCallback(async () => {
                await daemonManager.initDaemons();
            });
        });

        return daemonManager;
    }
}
