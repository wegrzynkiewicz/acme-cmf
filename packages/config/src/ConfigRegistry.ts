import {createDebugger} from '@acme/debug';
import type {ConfigEntryInterface} from './ConfigEntryInterface';

const debug = createDebugger('config:registry');

class ConfigRegistry {

    public readonly entries = new Map<string, ConfigEntryInterface>()

    public registerEntry(
        entry: ConfigEntryInterface,
    ): void {
        const {defaults, key, type} = entry;
        if (this.entries.has(key)) {
            throw new Error(`Configuration entry named (${key}) already exists.`);
        }
        debug('Registered config key (%s) with type (%s)', key, type);
        this.entries.set(key, {defaults, key, type});
    }
}

// TODO: Validation
const types = {
    commaSeparatedStrings: String,
    hostname: String,
    number: Number,
};

export {ConfigRegistry};
