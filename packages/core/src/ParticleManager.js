import {createDebugger} from '@acme/debug';

const debugRegister = createDebugger('particle:register');
const debugExec = createDebugger('particle:exec');

function upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export class ParticleManager {

    constructor({serviceLocator, stages}) {
        this.executedStages = [];
        this.particles = [];
        this.serviceLocator = serviceLocator;
        this.stages = new Set(stages);
    }

    async registerParticle(particle) {
        this.particles.push(particle);
        debugRegister('Registered particle (%s)', Object.getPrototypeOf(particle).constructor.name);
        for (const executedStage of this.executedStages) {
            await this.runStrategyParticleStage(this.runSingleParticleStage, particle, executedStage);
        }
    }

    async runStrategyParticleStage(strategy, object, stageName) {
        const capitalizedStageName = upperFirstLetter(stageName);
        await strategy.call(this, object, `onPre${capitalizedStageName}`);
        await strategy.call(this, object, `on${capitalizedStageName}`);
        await strategy.call(this, object, `onPost${capitalizedStageName}`);
    }

    async run(stageName) {
        if (this.stages.has(stageName) === false) {
            throw new Error(`Stage named (${stageName}) does not exists.`);
        }
        this.executedStages.push(stageName);
        await this.runStrategyParticleStage(this.runMultiParticleStage, this.particles, stageName);
    }

    async runMultiParticleStage(particles, stageName) {
        const promises = particles.map(async (particle) => {
            await this.runSingleParticleStage(particle, stageName);
        });
        return await Promise.all(promises);
    }

    async runSingleParticleStage(particle, stageName) {
        if (typeof particle[stageName] === 'function') {
            debugExec('Executing (%s.%s)', Object.getPrototypeOf(particle).constructor.name, stageName);
            await particle[stageName](this.serviceLocator);
        }
    }
}
