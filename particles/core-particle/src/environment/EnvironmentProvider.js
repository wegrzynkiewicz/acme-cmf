import {ServiceProvider} from 'acme-core';
import {Environment} from './Environment';

export class EnvironmentProvider extends ServiceProvider {

    constructor({name, variables}) {
        super({name});
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
