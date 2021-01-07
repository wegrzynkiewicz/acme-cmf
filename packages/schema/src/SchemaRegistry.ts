import {createDebugger} from '@acme/debug';
import type {Schema} from './Schema';

const debug = createDebugger('schema:registry');

export class SchemaRegistry {

    public readonly schemas: Map<string, Schema>;

    public constructor() {
        this.schemas = new Map<string, Schema>();
    }

    public registerSchema(schemaKey: string, schema: Schema): void {
        this.schemas.set(schemaKey, schema);
        debug('Registered schema (%s)', schemaKey);
    }
}
