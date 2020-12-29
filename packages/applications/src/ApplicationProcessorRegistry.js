export class ApplicationProcessorRegistry {

    constructor() {
        this.entries = new Map();
    }

    registerApplicationProcessor({key, processor}) {
        this.entries.set(key, processor);
    }
}
