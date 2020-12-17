export class HTTPServerParticle {

    constructor({serverName}) {
        this.serverName = serverName;
    }

    onInitConfig({configRegistry}) {
        const {serverName} = this;
        configRegistry.register({
            comments: 'Hostname on which the web server will listen.',
            defaults: '0.0.0.0',
            key: `http.server.${serverName}.hostname`,
            type: 'ip',
        });
        configRegistry.register({
            comments: 'Port on which the web server will listen.',
            defaults: 8000,
            key: `http.server.${serverName}.port`,
            type: 'port',
        });
    }

    onInitServices({config, serviceRegistry}) {

    }

    onInitControllers({config, serviceRegistry}) {

    }
}
