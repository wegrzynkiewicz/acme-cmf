class Stage {

    constructor() {
        this.listeners = [];
    }

    registerListener(listener) {
        this.listeners.push(listener);
    }

    async active(...args) {
        const promises = this.listeners.map((listener) => listener(...args));
        await Promise.all(promises);
    }
}

export class StageManager {

    constructor() {
        this.stages = new Map();
    }

    createStage(stageName) {
        const stage = new Stage();
        this.stages.set(stageName, stage);
    }

    registerStageListener(stageName, listener) {
        const stage = this.stages.get(stageName);
        stage.registerListener(listener);
    }

    async run(...args) {
        for (const stage of this.stages.values()) {
            await stage.active(...args);
        }
    }
}
