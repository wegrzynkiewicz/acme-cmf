import {createServer} from 'http';
import {Processor} from './Processor';

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

export class Server extends Processor {

    constructor({name, hostname, port}) {
        super({name});
        this.hostname = hostname;
        this.port = port;
        this.server = createServer();

        for (const eventName of events) {
            this.server.addListener(eventName.toString(), (...args) => this.emit(eventName, ...args));
        }
    }

    async listen() {
        const options = {
            host: this.hostname,
            port: this.port,
        };
        return new Promise((resolve, reject) => {
            this.server.listen(options, (error) => {
                if (error) {
                    reject(error);
                } else {
                    this.emit('listen');
                    resolve();
                }
            });
        });
    }
}
