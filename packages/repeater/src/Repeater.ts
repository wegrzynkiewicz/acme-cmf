/**
 * Create a function that will call the callback the indicated number of tries
 * in intervals until the correct result is obtained
 */
export class Repeater {

    private readonly callback: () => void;
    private readonly context: unknown;
    private readonly interval: number;
    private tries: number;

    public constructor(
        {
            callback,
            context,
            interval,
            tries,
        }: {
            readonly callback: () => void,
            readonly context: unknown,
            readonly interval: number,
            readonly tries: number,
        },
    ) {
        this.callback = callback;
        this.context = context;
        this.interval = interval;
        this.tries = tries;
    }

    public async execute(...args: readonly unknown[]): Promise<void> {
        while (true) {
            try {
                await this.callback.apply(this.context, args);
                return;
            } catch (error: unknown) {
                this.tries--;
                if (this.tries === 0) {
                    throw error;
                }
                await this.sleep(this.interval);
            }
        }
    }

    private async sleep(milliseconds: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}
