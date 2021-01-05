import {ConsoleOption} from '../define/ConsoleOption';

export class QuietOption extends ConsoleOption {

    public static readonly instance = new QuietOption();

    public constructor() {
        super({
            description: 'Do not output any message.',
            longFlags: ['quiet'],
            name: 'quiet',
            shortFlags: ['q'],
        });
    }
}
