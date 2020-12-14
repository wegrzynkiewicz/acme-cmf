export class ConsoleParticle {

    constructor({stderr, stdout}) {
        this.stderr = stderr;
        this.stdout = stdout;
    }

    onPreInitServices({serviceRegistry}) {
        serviceRegistry.registry({
            comment: 'Store all information about console commands.',
        });
    }

    onInitConsoleCommands({config, serviceRegistry}) {

    }
}
