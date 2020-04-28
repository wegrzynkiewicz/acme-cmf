import {ServiceProvider} from 'acme-core';
import {Warden} from './Warden';

export class WardenProvider extends ServiceProvider {

    constructor() {
        super({
            name: 'warden',
        });
    }

    async provide(serviceLocator) {
        const warden = new Warden({serviceLocator});
        return warden;
    }
}

