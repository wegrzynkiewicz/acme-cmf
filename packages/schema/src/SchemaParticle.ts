import type {ParticleInterface, ServiceRegistry} from '@acme/service';
import {SchemaRegistry} from './SchemaRegistry';

export class SchemaParticle implements ParticleInterface {

    public async onInitServices(
        {serviceRegistry}: {
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const schemaRegistry = new SchemaRegistry();
        serviceRegistry.registerService('schemaRegistry', schemaRegistry);
    }
}
