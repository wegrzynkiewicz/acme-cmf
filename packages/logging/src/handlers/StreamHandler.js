export class StreamHandler {

    constructor({filter, formatter, stream}) {
        this.filter = filter;
        this.formatter = formatter;
        this.stream = stream;
    }

    handle(log) {
        if (this.filter.isAcceptable(log)) {
            const string = this.formatter.format(log);
            this.stream.write(string);
        }
    }
}
