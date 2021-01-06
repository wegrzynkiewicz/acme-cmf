import {SchemaRegistry} from './SchemaRegistry';

export class SchemaParticle {

    onInitServices({serviceRegistry}) {
        const schemaRegistry = new SchemaRegistry();
        serviceRegistry.registerService('schemaRegistry', schemaRegistry);
    }
}
