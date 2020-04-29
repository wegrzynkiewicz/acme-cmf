import {EventEmitter} from 'events';
import {createServer} from 'http';

export class HTTPServer extends EventEmitter {

    constructor({hostname, port}) {
        super();
        this.hostname = hostname;
        this.port = port;
        this.server = createServer();
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