export class HTTPManager {

    constructor() {
        this.entries = new Map();
    }

    register(entry) {
        this.entries.set(entry.name, entry);
    }

    get(entryName) {
        if (this.entries.has(entryName) === false) {
            throw new Error(`HTTP entry named (${entryName}) does not exits.`);
        }
        return this.entries.get(entryName);
    }
}
