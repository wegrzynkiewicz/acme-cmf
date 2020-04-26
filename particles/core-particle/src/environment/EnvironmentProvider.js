import {ServiceProvider} from 'acme-core';
import {Environment} from './Environment';

export class EnvironmentProvider extends ServiceProvider {

    constructor({variables}) {
        super({
            name: 'environment',
        });
        this.variables = variables;
    }

    async provide(serviceLocator) {
        const variables = this.variables;
        const environment = new Environment({
            variables,
        });
        return environment;
    }
}
