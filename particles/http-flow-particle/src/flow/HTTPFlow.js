import {EventEmitter} from 'events';
import {createServer} from 'http';

export class HTTPFlow extends EventEmitter {

    constructor({httpServer, requestProcessor}) {
        super();
        this.hostname = hostname;
        this.port = port;
        this.requestProcessor = requestProcessor;
        this.server = createServer();
        this.server.addListener('request', this.onRequest.bind(this));
    }
}
