import {HTTPServer} from './HTTPServer';

export class HTTPServerManager {

    constructor({serviceLocator}) {
        this.servers = new Map();
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