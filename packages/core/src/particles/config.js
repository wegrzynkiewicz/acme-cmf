export class Config {

    constructor() {
        this.declaredEntries = new Map();
    }

    get(key) {

    }

    declare({key}) {
        this.declaredEntries.set(key, key);
    }
}

Config.prototype.types = {
    number: Number,
    hostname: String,
}

export const createConfigParticle = () => ({
    bootstrap({stageManager}) {
        stageManager.registerStageListener('service-creation', ({serviceRegistry}) => {
            serviceRegistry.registerService('config', new Config());
        });
    },
});
