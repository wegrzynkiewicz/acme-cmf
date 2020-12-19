import {ServerResponse as BaseServerResponse} from 'http';
import {createDebugger} from '@acme/debug';

const debug = createDebugger('http-base');

export class ServerResponse extends BaseServerResponse {

    constructor(incomingRequest) {
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
