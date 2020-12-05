export class Filter {

    constructor({minSeverity}) {
        this.minSeverity = minSeverity;
    }

    isAcceptable(log) {
        const {severity} = this;

        if (severity > this.minSeverity) {
            return false;
        }

        return true;
    }
}
