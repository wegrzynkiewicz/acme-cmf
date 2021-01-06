import {IncomingMessage} from 'http';
import {createDebugger} from '@acme/debug';
import uniqid from 'uniqid';

const debug = createDebugger('http-base');

export class IncomingRequest extends IncomingMessage {

    constructor(socket) {
        super(socket);
        this.uniqid = uniqid();
        debug('Incoming request (%o) created', this.uniqid);
    }
}
