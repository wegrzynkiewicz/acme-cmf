export class StrictMethods {

    constructor(allowedMethods) {
        this.allowedMethods = [...allowedMethods].map((method) => method.toUpperCase());
    }

    match(routingStateContext) {
        return this.allowedMethods.indexOf(routingStateContext.method) !== -1;
    }

    mutate(routingStateContext) {
        // Nothing
    }
}
