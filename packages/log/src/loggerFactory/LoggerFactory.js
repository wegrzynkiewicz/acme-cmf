export class LoggerFactory {

    constructor({create, logBus, tags}) {
        this.create = create;
        this.logBus = logBus;
        this.tags = tags;
    }

    produceLogger({channel}) {
        const {create, logBus, tags} = this;
        return create({channel, logBus, tags});
    }
}
