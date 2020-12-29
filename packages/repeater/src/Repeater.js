import EventEmitter from 'events';

/**
 * Create a function that will call the callback the indicated number of tries
 * in intervals until the correct result is obtained
 */
export class Repeater extends EventEmitter {

    /**
     * @param callback {Function}
     * @param context {Object}
     * @param tries {Number}
     * @param interval {Number} Milliseconds
     */
    constructor({callback, context, interval, tries}) {
        super();
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
                this.emit('repeated', {
                    error,
                    tries: this.tries,
                });
                if (this.tries === 0) {
                    this.emit('error', error);
                    throw error;
                }
                await this.sleep(this.interval);
            }
        }
    }

    async sleep(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}
