import {createDebugger} from '@acme/debug';

const debug = createDebugger('config:registry');

class ConfigRegistry {

    constructor() {
        this.entries = new Map();
    }

    register(entry) {
        const {key, type} = entry;
        if (this.entries.has(key) === true) {
            throw new Error(`Configuration entry named (${key}) already exists.`);
        }
        debug('Registered config key (%s) with type (%s)', key, type);
        this.entries.set(key, entry);
    }
}

ConfigRegistry.prototype.types = {
    commaSeparatedStrings: String,
    hostname: String,
    number: Number,
};

export {ConfigRegistry};
