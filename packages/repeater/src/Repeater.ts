/**
 * Create a function that will call the callback the indicated number of tries
 * in intervals until the correct result is obtained
 */
export class Repeater {

    private readonly callback: Function;
    private readonly context: Object;
    private readonly interval: number;
    private tries: number;

    constructor(
        {
            callback,
            context,
            interval,
            tries,
        }: {
            callback: Function,
            context: Object,
            interval: number,
            tries: number,
        }
    ) {
        this.callback = callback;
        this.context = context;
        this.interval = interval;
        this.tries = tries;
    }

    async execute(...args) {
        while (true) {
            try {
                return await this.callback.apply(this.context, args);
            } catch (error) {
                this.tries--;
                if (this.tries === 0) {
                    throw error;
                }
                await this.sleep(this.interval);
            }
        }
    }

    async sleep(milliseconds): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}
