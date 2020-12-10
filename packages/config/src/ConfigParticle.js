import {ConfigRegistry} from './ConfigRegistry';
import {ConfigResolver} from './ConfigResolver';

export class ConfigParticle {

    constructor({environmentVariables}) {
        this.environmentVariables = environmentVariables;
    }

    onPreInitConfig({serviceRegistry}) {
        serviceRegistry.register({
            comment: 'Collect all configuration variables.',
            key: 'configRegistry',
            service: new ConfigRegistry(),
        });
    }

    onPreInitServices({configRegistry, serviceRegistry}) {

        const {environmentVariables} = this;
        const configResolver = new ConfigResolver({environmentVariables});
        const config = configResolver.resolve({configRegistry});

        serviceRegistry.register({
            comment: 'Stores global configuration.',
            key: 'config',
            service: config,
        });
    }
}
