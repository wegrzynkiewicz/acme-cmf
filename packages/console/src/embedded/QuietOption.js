import {ConsoleOption} from '../define/ConsoleOption';

export class QuietOption extends ConsoleOption {

    constructor() {
        super({
            defaults: false,
            description: 'Do not output any message.',
            longFlags: ['quiet'],
            name: 'quiet',
            shortFlags: ['q'],
        });
    }
}
