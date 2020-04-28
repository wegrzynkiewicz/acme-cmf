import {ServiceProvider} from '../dependency/ServiceProvider';
import {DaemonRegistry} from './DaemonRegistry';

export class DaemonRegistryProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const daemonManager = new DaemonRegistry({serviceLocator});

        this.serviceLocator.wait('initializer').then((initializer) => {
            initializer.registerCallback(async () => {
                await daemonManager.initDaemons();
            });
        });

        return daemonManager;
    }
}
