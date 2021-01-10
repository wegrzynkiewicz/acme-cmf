import {IncomingMessage} from 'http';
import type {Socket} from 'net';
import {createDebugger} from '@acme/debug';
import * as uniqid from 'uniqid';

const debug = createDebugger('http-base');

export class IncomingRequest extends IncomingMessage {

    public readonly uniqid: string;

    public constructor(socket: Socket) {
        super(socket);
        this.uniqid = uniqid();
        debug('Incoming request (%o) created', this.uniqid);
    }
}
