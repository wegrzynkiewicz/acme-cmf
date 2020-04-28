import {createServer} from 'http';

export class HTTPServerManager {

    constructor() {
        this.servers = new Map();
    }

    createHTTPServer({name}) {
        const server = createServer();
        this.servers.set(name, server);
        return server;
    }
}
