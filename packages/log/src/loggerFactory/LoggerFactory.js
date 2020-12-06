export class LoggerFactory {

    constructor({create, logBus, tags}) {
        this.create = create;
        this.logBus = logBus;
        this.tags = tags;
    }

    produce({channel}) {
        const {create, logBus, tags} = this;
        return create({channel, logBus, tags});
    }
}
