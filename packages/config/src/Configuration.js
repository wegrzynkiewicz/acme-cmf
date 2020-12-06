const regex = new RegExp('\\.', 'g');

function transformKey(key) {
    const prefix = 'APP_';
    return prefix + (key.toString().replace(regex, '_').toUpperCase());
}

function createChainResolver({items}) {
    return function (...args) {
        for (const item of items) {
            const result = item.resolve(...args);
            if (result) {
                return result;
            }
        }
        return null;
    };
}

function getFromEnv(entry) {
    const envVarName = transformKey(entry.key);
    const envVarValue = process.env[envVarName];
    if (envVarValue !== undefined) {
        return envVarValue;
    }
}

function loadDefault(entry) {
    return entry.defaults;
}

class Configuration {

    constructor({entries}) {
        this.entries = entries;
    }

    get(key) {
        return this.entries[key];
    }

    load() {
        const chainResolver = createChainResolver({
            items: [
                {resolve: getFromEnv},
                {resolve: loadDefault},
            ],
        });

        const values = [...this.declaredEntries.values()].map(chainResolver);
        console.log(values);
    }
}

Configuration.prototype.types = {
    commaSeparatedStrings: String,
    hostname: String,
    number: Number,
};

export {Configuration};

// console parameters flag
// env
// dotenv
// config-file
// defaults
