import {createDebugger} from '@acme/debug';

const debug = createDebugger('particle:exec');

export class ParticleManager {

    constructor({particles, serviceLocator}) {
        this.particles = [...particles];
        this.serviceLocator = serviceLocator;
    }

    async run(field) {
        const promises = this.particles.map(async (particle) => {
            if (typeof particle[field] === 'function') {
                await particle[field](this.serviceLocator);
                debug('Executed particle (%s) method (%s)', Object.getPrototypeOf(particle).constructor.name, field);
            }
        });
        return await Promise.all(promises);
    }
}
