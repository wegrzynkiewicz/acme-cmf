import {ServiceProvider} from 'acme-core';
import {LogBus} from './LogBus';

export class LogBusProvider extends ServiceProvider {

    async provide(serviceLocator) {
        const logBus = new LogBus();
        return logBus;
    }
}
