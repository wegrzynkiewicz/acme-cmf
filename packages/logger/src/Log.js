export class Log {

    constructor({channel, message, parameters = undefined, severity, tags}) {
        const parsed = parseInt(severity, 10);
        if (isNaN(parsed) || parsed < 0 || parsed > 8) {
            throw new Error('Invalid log severity passed.');
        }
        this.channel = channel === undefined ? '' : channel;
        this.message = message === undefined ? '' : message;
        this.parameters = parameters;
        this.severity = parsed;
        this.tags = new Set(tags === undefined ? [] : tags);
        this.time = new Date();
    }
}
