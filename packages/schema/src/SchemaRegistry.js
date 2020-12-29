import {createDebugger} from '@acme/debug';

const debug = createDebugger('schema:registry');

export class SchemaRegistry {

    constructor() {
        this.schemas = new Map();
    }

    registerSchema({key, schema}) {
        const {[schemaKeySymbol]: key} = schema;
        if (typeof key !== 'string' || key.length === 0) {
            throw new Error('Schema key must be valid string.');
        }
        this.schemas.set(key, schema);
        debug('Registered schema (%s)', key);
    }
}
