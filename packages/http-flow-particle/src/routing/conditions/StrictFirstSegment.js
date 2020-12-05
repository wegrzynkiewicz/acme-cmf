export class StrictFirstSegment {

    constructor(segment) {
        this.segment = segment;
    }

    match(routingStateContext) {
        if (routingStateContext.segments.length === 0) {
            return false;
        }
        const firstSegment = routingStateContext.segments[0];
        const isStrict = firstSegment === this.segment;
        return isStrict;
    }

    mutate(routingStateContext) {
        routingStateContext.segments.shift();
    }
}
