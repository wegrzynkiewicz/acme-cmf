import {EventEmitter} from 'events';
import {createServer} from 'http';

export class HTTPFlow extends EventEmitter {

    constructor({httpServer, requestProcessor}) {
        super();
        this.requestProcessor = requestProcessor;
        this.httpServer.addListener('request', this.onRequest.bind(this));
    }
}
