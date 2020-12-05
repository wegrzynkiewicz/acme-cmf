import {createServer} from "http";

export function createHTTPServer({translator, config}) {
    const server = createServer();

    server.on('request', (request, response) => {
        response.end('Hello World!');
    });

    const port = config.get('http.server.web.port');
    const hostname = config.get('http.server.web.hostname');

    server.listen(port, hostname);
}

function setup({config}) {
    config.declare({
        key: 'http.server.web.hostname',
        defaults: '0.0.0.0',
        type: config.types.hostname,
    });
    config.declare({
        key: 'http.server.web.port',
        defaults: 8080,
        type: config.types.number,
    });
}

function bootstrap({stageManager}) {
    stageManager.registerStageListener('environment-setup', setup);
    stageManager.registerStageListener('service-creation', createHTTPServer);
}

export const createServerParticle = () => ({bootstrap});
