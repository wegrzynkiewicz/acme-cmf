import {IncomingMessage} from 'http';
import uniqid from 'uniqid';
import {createDebugger} from '@acme/debug';

const debug = createDebugger('http-base');

export class IncomingRequest extends IncomingMessage {

    constructor(socket) {
        super(socket);
        this.uniqid = uniqid();
        debug('Incoming request (%o) created', this.uniqid);
    }
}
