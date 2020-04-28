import {EventEmitter} from 'events';
import {createServer} from 'http';

export class HTTPServer extends EventEmitter {

    constructor({hostname, port, requestProcessor}) {
        super();
        this.hostname = hostname;
        this.port = port;
        this.requestProcessor = requestProcessor;
        this.server = createServer();
        this.server.addListener('request', this.onRequest.bind(this));
    }

    onRequest(request, response) {
        const {server} = this;
        this.requestProcessor.processRequest({request, response, server});
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
