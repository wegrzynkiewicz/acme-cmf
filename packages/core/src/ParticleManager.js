import {createDebugger} from '@acme/debug';

const debug = createDebugger('particle:exec');

function upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export class ParticleManager {

    constructor({particles, serviceLocator}) {
        this.particles = [...particles];
        this.serviceLocator = serviceLocator;
    }

    async run(methodName) {
        const capitalizedMethodName = upperFirstLetter(methodName);
        await this.execCallback(`onPre${capitalizedMethodName}`);
        await this.execCallback(`on${capitalizedMethodName}`);
        await this.execCallback(`onPost${capitalizedMethodName}`);
    }

    async execCallback(methodName) {
        const promises = this.particles.map(async (particle) => {
            if (typeof particle[methodName] === 'function') {
                debug('Executing (%s.%s)', Object.getPrototypeOf(particle).constructor.name, methodName);
                await particle[methodName](this.serviceLocator);
            }
        });
        return await Promise.all(promises);
    }
}
