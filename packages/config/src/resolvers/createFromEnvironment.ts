import type {ConfigEntryInterface} from '../ConfigEntryInterface';

const regex = new RegExp('\\.', 'g');

function transformKey(key: string): string {
    const prefix = 'ACME_';
    return prefix + (key.toString().replace(regex, '_').toUpperCase());
}

export function createFromEnvironment(
    {environmentVariables}: {
        environmentVariables: Record<string, unknown>,
    },
): (entry: ConfigEntryInterface) => unknown {
    return function getFromEnv(entry: ConfigEntryInterface): unknown {
        const envVarName = transformKey(entry.key);
        const envVarValue = environmentVariables[envVarName];
        if (envVarValue !== undefined) {
            return envVarValue;
        }
    };
}
