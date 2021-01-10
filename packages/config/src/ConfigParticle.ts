import type {ServiceRegistry} from '@acme/service';
import {ConfigRegistry} from './ConfigRegistry';
import {ConfigResolver} from './ConfigResolver';

export class ConfigParticle {

    private readonly environmentVariables: Record<string, unknown>;

    public constructor(
        {environmentVariables}: {
            environmentVariables: Record<string, unknown>,
        },
    ) {
        this.environmentVariables = environmentVariables;
    }    
    
    public async onPreInitConfig(
        {serviceRegistry}: {
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const configRegistry = new ConfigRegistry();
        serviceRegistry.registerService('configRegistry', configRegistry);
    }
    
    public async onPreInitServices(
        {configRegistry, serviceRegistry}: {
            configRegistry: ConfigRegistry,
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const {environmentVariables} = this;
        const configResolver = new ConfigResolver({environmentVariables});
        const config = configResolver.resolve({configRegistry});
        serviceRegistry.registerService('config', config);
    }
}
