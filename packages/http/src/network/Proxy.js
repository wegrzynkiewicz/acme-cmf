export class Proxy {

    constructor({name, processor}) {
        this.name = name;
        this.processor = processor;
    }

    setProcessor(processor) {
        this.processor = processor;
    }

    async process(serviceLocator, context) {
        if (this.processor === undefined) {
            throw new Error('Proxy not contain valid processor.');
        }
        this.processor.process(serviceLocator, context);
    }
}
