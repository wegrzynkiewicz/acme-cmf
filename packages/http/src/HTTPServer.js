import http from 'http';

export class HTTPServerManager {

    constructor({hostname, port}) {
        this.hostname = hostname;
        this.port = port;

        const server = http.createServer();
        server.addListener('request', this.onRequest.bind(this));
    }

    async init() {
    }

    async onRequest(request, response) {

    }
}
