import {ServerResponse} from 'http';
import {createDebugger} from '@acme/debug';
import type {IncomingRequest} from './IncomingRequest';

export const debug = createDebugger('http-base');

export class OutgoingResponse extends ServerResponse {

    public readonly uniqid: string;

    public constructor(incomingRequest: IncomingRequest) {
        super(incomingRequest);
        this.uniqid = incomingRequest.uniqid;

        debug('Server response (%o) created', this.uniqid);

        this.on('close', () => {
            debug('Server response (%o) closed', this.uniqid);
        });
        this.on('finish', () => {
            debug('Server response (%o) finished', this.uniqid);
        });
    }
}
