import {createServer, Server} from 'http';

export class HTTPServerManager {

    constructor() {
        this.servers = new Set();
    }

    registerServer(server) {
        if (!(server instanceof Server)) {
            throw new Error('Invalid server instance.');
        }
        this.servers.set(server.name, server);
    }
}
