import {Server as BaseServer} from 'http';
import {createDebugger} from '@acme/debug';

const debug = createDebugger('http-server');

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

    constructor({name, hostname, port}) {
        super();
        this.hostname = hostname;
        this.name = name;
        this.port = port;

        for (const event of events) {
            const eventName = event.toString();
            this.addListener(eventName, () => {
                debug('Incoming HTTP server (%s) event (%s)', this.name, eventName);
            });
        }
    }

    async listenRequests() {
        const options = {
            host: this.hostname,
            port: this.port,
        };
        return new Promise((resolve, reject) => {
            this.listen(options, (error) => {
                if (error) {
                    reject(error);
                } else {
                    debug('Server start listening on (%s:%s)', this.hostname, this.port);
                    resolve();
                }
            });
        });
    }
}
