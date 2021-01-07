import {createDebugger} from '@acme/debug';
import type {ParticleInterface} from './ParticleInterface';

const debugRegister = createDebugger('particle:register');
const debugExec = createDebugger('particle:exec');

function upperFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPrototypeName(object: unknown): string {
    if (typeof object === 'object' && object) {
        const prototype = Object.getPrototypeOf(object) as {['constructor']: {name: string}};
        return prototype.constructor.name;
    }
    return '';
}

export class ParticleManager {
    private readonly executedStages: string[];
    private readonly particles: ParticleInterface[];
    private readonly serviceLocator: Record<string, unknown>;
    private readonly stages: Set<string>;

    public constructor(
        {serviceLocator, stages}: {
            serviceLocator: Record<string, unknown>,
            stages: Set<string>,
        },
    ) {
        this.executedStages = [];
        this.particles = [];
        this.serviceLocator = serviceLocator;
        this.stages = new Set(stages);
    }

    public async registerParticle(particle: ParticleInterface): Promise<void> {
        this.particles.push(particle);
        debugRegister('Registered particle (%s)', getPrototypeName(particle));
        for (const executedStage of this.executedStages) {
            await this.runAllParticleStage([particle], executedStage);
        }
    }

    public async run(stageName: string): Promise<void> {
        if (!this.stages.has(stageName)) {
            throw new Error(`Stage named (${stageName}) does not exists.`);
        }
        this.executedStages.push(stageName);
        await this.runAllParticleStage(this.particles, stageName);
    }

    private async runAllParticleStage(
        particles: ParticleInterface[],
        stageName: string,
    ): Promise<void> {
        const capitalizedStageName = upperFirstLetter(stageName);
        await this.runMultiParticleStage(particles, `onPre${capitalizedStageName}`);
        await this.runMultiParticleStage(particles, `on${capitalizedStageName}`);
        await this.runMultiParticleStage(particles, `onPost${capitalizedStageName}`);
    }

    private async runMultiParticleStage(
        particles: ParticleInterface[],
        stageName: string,
    ): Promise<void> {
        const promises = particles.map(async (particle) => {
            await this.runSingleParticleStage(particle, stageName);
        });
        await Promise.all(promises);
    }

    private async runSingleParticleStage(
        particle: ParticleInterface,
        stageName: string,
    ): Promise<void> {
        if (typeof particle[stageName] === 'function') {
            debugExec('Executing (%s.%s)', getPrototypeName(particle), stageName);
            const method = particle[stageName] as ((serviceLocator: (Record<string, unknown>)) => Promise<void>);
            await method.call(particle, this.serviceLocator);
        }
    }
}
