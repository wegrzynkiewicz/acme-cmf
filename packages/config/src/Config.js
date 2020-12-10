export class Config {

    constructor({entries}) {
        this.entries = entries;
    }

    get(key) {
        return this.entries[key];
    }
}
