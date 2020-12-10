import {createDebugger} from '@acme/debug';
import {createFromEnvironment} from './resolvers/createFromEnvironment';

const debug = createDebugger('config:resolver');

function loadDefault(entry) {
    return entry.defaults;
}

export class ConfigResolver {

    constructor({environmentVariables}) {
        this.resolvers = [
            createFromEnvironment({environmentVariables}),
            loadDefault,
        ];
    }

    resolve({configRegistry}) {
        const config = new Map();
        for (const entry of configRegistry.entries.values()) {
            const value = this.resolveEntry(entry);
            config.set(entry.key, value);
        }
        return config;
    }

    resolveEntry(entry) {
        const {key} = entry;
        for (const resolver of this.resolvers) {
            const result = resolver(entry);
            if (result) {
                debug('Resolved config key (%s) with value (%o)', key, result);
                return result;
            }
        }
        throw new Error(`Cannot resolve config option named (${key})`);
    }
}

// console parameters flag
// env
// dotenv
// config-file
// defaults
