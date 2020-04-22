export class LoggerFactory {

    constructor({tags, constructor, logBus}) {
        this.constructor = constructor;
        this.logBus = logBus;
        this.tags = tags;
    }

    produce({channel}) {
        const {tags, constructor, logBus} = this;
        const logger = new constructor({channel, logBus, tags});

        return logger;
    }
}
