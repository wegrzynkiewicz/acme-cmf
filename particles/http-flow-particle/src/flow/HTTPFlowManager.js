import {HTTPServer} from '../server/HTTPServer';

export class HTTPFlowManager {

    constructor({serviceLocator}) {
        this.requestProcessors = new Map();
        this.servers = new Map();
        this.serviceLocator = serviceLocator;
    }

    createRequestProcessor() {
        this.requestProcessors.add();
    }

    createHTTPServer({hostname, name, port}) {
        const server = new HTTPServer({
            hostname,
            port,
        });
        this.servers.set(name, server);
        return server;
    }
}
