export class SeverityFilter {

    constructor({minSeverity}) {
        this.minSeverity = minSeverity;
    }

    filtrate({severity}) {
        if (severity > this.minSeverity) {
            return false;
        }
        return true;
    }
}
