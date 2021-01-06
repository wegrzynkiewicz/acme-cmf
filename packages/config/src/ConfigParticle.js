import {ConfigRegistry} from './ConfigRegistry';
import {ConfigResolver} from './ConfigResolver';

export class ConfigParticle {

    constructor({environmentVariables}) {
        this.environmentVariables = environmentVariables;
    }

    onPreInitConfig({serviceRegistry}) {
        const configRegistry = new ConfigRegistry();
        serviceRegistry.registerService('configRegistry', configRegistry);
    }

    onPreInitServices({configRegistry, serviceRegistry}) {
        const {environmentVariables} = this;
        const configResolver = new ConfigResolver({environmentVariables});
        const config = configResolver.resolve({configRegistry});
        serviceRegistry.registerService('config', config);
    }
}
