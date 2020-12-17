export class CoreParticle {

    constructor({process}) {
        this.process = process;
    }

    onInitParticle() {
        const {process} = this;
        process.on('multipleResolves', (type, promise, reason) => {
            console.error({promise, reason, type});
            throw new Error('MultipleResolves');
        });
    }

    onPostInitServices({logger}) {
        process.on('multipleResolves', (type, promise, reason) => {
            logger.error('MultipleResolves', {promise, reason, type});
        });
    }
}
