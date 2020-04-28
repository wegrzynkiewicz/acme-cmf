import {ServiceProvider} from '../dependency/ServiceProvider';
import {Initializer} from './Initializer';

export class InitializerProvider extends ServiceProvider {

    constructor({name}) {
        super({name});
    }

    async provide(serviceLocator) {
        const initializer = new Initializer({serviceLocator});
        return initializer;
    }
}
