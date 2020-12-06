export class ConfigurationRegistry {

    constructor() {
        this.entities = new Map();
    }

    declare(entry) {
        const {key} = entry;
        if (this.entities.has(key) === true) {
            throw new Error(`Configuration entry named (${key}) already exists.`);
        }
        this.entities.set(key, entry);
    }
}
