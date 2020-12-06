export class SeverityFilter {

    constructor({minSeverity}) {
        this.minSeverity = minSeverity;
    }

    filter({severity}) {
        if (severity > this.minSeverity) {
            return false;
        }
        return true;
    }
}
