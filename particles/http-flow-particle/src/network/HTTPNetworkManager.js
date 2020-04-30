export class HTTPNetworkManager {

    constructor({serviceLocator}) {
        this.networks = new Map();
        this.procesors = new Map();
        this.serviceLocator = serviceLocator;
    }

    registerNetwork(network) {
        this.networks.set(network.name, network);
    }

    registerProcessor(processor) {
        this.processor.set(processor.name, processor);
    }
}
