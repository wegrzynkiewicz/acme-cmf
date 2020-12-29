const regex = new RegExp('\\.', 'g');

function transformKey(key) {
    const prefix = 'ACME_';
    return prefix + (key.toString().replace(regex, '_').toUpperCase());
}

export function createFromEnvironment({environmentVariables}) {
    return function getFromEnv(entry) {
        const envVarName = transformKey(entry.key);
        const envVarValue = environmentVariables[envVarName];
        if (envVarValue !== undefined) {
            return envVarValue;
        }
    };
}
