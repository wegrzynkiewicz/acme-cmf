import {Server as BaseServer} from 'http';
import type {Socket} from 'net';
import {createDebugger} from '@acme/debug';
import {IncomingRequest} from './IncomingRequest';
import {OutgoingResponse} from './OutgoingResponse';

const debug = createDebugger('http-base');

const events = [
    'checkContinue',
    'checkExpectation',
    'clientError',
    'close',
    'connect',
    'connection',
    'request',
    'upgrade',
];

export class Server extends BaseServer {

    public readonly hostname: string;
    public readonly name: string;
    public readonly port: number;

    public constructor(
        {name, hostname, port}: {
            name: string,
            hostname: string,
            port: number,
        },
    ) {
        super({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            IncomingMessage: IncomingRequest,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ServerResponse: OutgoingResponse,
        });
        this.hostname = hostname;
        this.name = name;
        this.port = port;

        for (const event of events) {
            const eventName = event.toString();
            this.addListener(eventName, () => {
                debug('Incoming HTTP server (%s) event (%s)', this.name, eventName);
            });
        }

        this.addListener('connection', (socket: Socket): void => {
            this.onConnection(socket);
        });
    }

    public async listenRequests(): Promise<void> {
        const options = {
            host: this.hostname,
            port: this.port,
        };
        return new Promise((resolve, reject) => {
            this.listen(options, (): void => {
                debug('Server start listening on (%s:%s)', this.hostname, this.port);
                resolve();
            });
        });
    }

    private onConnection(socket: Socket): void {
        socket.addListener('close', (): void => {
            debug('Connection close');
        });
    }
}
