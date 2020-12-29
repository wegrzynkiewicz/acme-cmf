export class AppProcessorRegistry {

    constructor() {
        this.entries = new Map();
    }

    getAppProcessor(key) {
        return this.entries.get(key);
    }

    registerAppProcessor({key, processor}) {
        this.entries.set(key, processor);
    }
}
