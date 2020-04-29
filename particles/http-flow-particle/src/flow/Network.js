import {Processor} from './Processor';
import {RoutingStateContext} from '../..';

export class Network extends Processor {

    constructor({name, processor, server, serviceLocator}) {
        super({name});
        this.contexts = new Set();
        this.processor = processor;
        this.server = server;
        this.serviceLocator = serviceLocator;

        this.server.addListener('request', this.onRequest.bind(this));
    }

    onRequest(request, response) {
        const {server, serviceLocator} = this;
        const childServiceLocator = serviceLocator.createChild();
        const routingStateContext = RoutingStateContext.createFromRequest(request);
        childServiceLocator.set('server', server);
        childServiceLocator.set('request', request);
        childServiceLocator.set('response', response);
        childServiceLocator.set('routingStateContext', routingStateContext);

        this.contexts.add(childServiceLocator);
        this.processor.process(childServiceLocator);
    }
}
