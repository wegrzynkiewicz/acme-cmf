export class CoreParticle {

    constructor({process}) {
        this.process = process;
    }

    onInitParticle() {
        const {process} = this;

        process.on('unhandledRejection', (error) => {
            throw error;
        });
        process.on('multipleResolves', (type, promise, reason) => {
            console.error({promise, reason, type});
            throw new Error('MultipleResolves');
        });
    }

    onPostInitServices({logger}) {
        process.on('uncaughtException', (error) => {
            logger.error(error.stack);
        });
        process.on('multipleResolves', (type, promise, reason) => {
            logger.error('MultipleResolves', {promise, reason, type});
        });
    }
}
