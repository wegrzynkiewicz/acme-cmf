import {createDebugger} from '@acme/debug';

const debug = createDebugger('config:registry');

class ConfigRegistry {

    constructor() {
        this.entries = new Map();
    }

    register({comment, defaults, key, type}) {
        if (this.entries.has(key) === true) {
            throw new Error(`Configuration entry named (${key}) already exists.`);
        }
        debug('Registered config key (%s) with type (%s)', key, type);
        this.entries.set(key, {defaults, key, type});
    }
}

ConfigRegistry.prototype.types = {
    commaSeparatedStrings: String,
    hostname: String,
    number: Number,
};

export {ConfigRegistry};
