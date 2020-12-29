import {SchemaRegistry} from './SchemaRegistry';

export class SchemaParticle {

    onInitServices({serviceRegistry}) {
        serviceRegistry.registerService({
            key: 'schemaRegistry',
            service: new SchemaRegistry(),
        });
    }
}
