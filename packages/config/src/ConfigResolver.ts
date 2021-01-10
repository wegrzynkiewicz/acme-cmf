import {createDebugger} from '@acme/debug';
import type {ConfigEntryInterface} from './ConfigEntryInterface';
import type {ConfigRegistry} from './ConfigRegistry';
import {createFromEnvironment} from './resolvers/createFromEnvironment';

const debug = createDebugger('config:resolver');

function loadDefault(entry: ConfigEntryInterface): unknown {
    return entry.defaults;
}

export class ConfigResolver {

    private readonly resolvers: ((entry: ConfigEntryInterface) => unknown)[];

    public constructor(
        {environmentVariables}: {
            environmentVariables: Record<string, unknown>,
        },
    ) {
        this.resolvers = [
            createFromEnvironment({environmentVariables}),
            loadDefault,
        ];
    }

    public resolve(
        {configRegistry}: {
            configRegistry: ConfigRegistry,
        },
    ): Map<string, unknown> {
        const config = new Map<string, unknown>();
        for (const entry of configRegistry.entries.values()) {
            const value = this.resolveEntry(entry);
            config.set(entry.key, value);
        }
        return config;
    }

    public resolveEntry(entry: ConfigEntryInterface): unknown {
        const {key} = entry;
        for (const resolver of this.resolvers) {
            const result = resolver(entry);
            if (result !== undefined) {
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
