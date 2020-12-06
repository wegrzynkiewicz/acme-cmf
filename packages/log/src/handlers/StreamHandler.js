export class StreamHandler {

    constructor({filter, formatter, stream}) {
        this.filter = filter;
        this.formatter = formatter;
        this.stream = stream;
    }

    handle(log) {
        if (this.filter.filtrate(log)) {
            const formattedLog = this.formatter.format(log);
            this.stream.write(formattedLog);
        }
    }
}
