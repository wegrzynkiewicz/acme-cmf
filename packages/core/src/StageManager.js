export class StageManager {

    constructor({particleManager, stages = []}) {
        this.particleManager = particleManager;
        this.stages = new Set(stages);
    }

    async run(stageName) {
        if (this.stages.has(stageName) === false) {
            throw new Error(`Stage named (${stageName}) does not exists.`);
        }
        await this.particleManager.run(stageName);
    }
}
