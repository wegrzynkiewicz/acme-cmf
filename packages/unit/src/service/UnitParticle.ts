import type {ParticleInterface, ServiceRegistry} from '@acme/service';
import {UnitBlueprintRegistry} from './UnitBlueprintRegistry';

export class UnitParticle implements ParticleInterface {

    public async onInitServices(
        {serviceRegistry}: {
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const unitBlueprintRegistry = new UnitBlueprintRegistry();
        serviceRegistry.registerService('unitBlueprintRegistry', unitBlueprintRegistry);
    }
}
