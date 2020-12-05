export class Route {

    constructor({conditions, name, processor}) {
        this.conditions = [...conditions];
        this.name = name;
        this.processor = processor;
    }

    match(routingStateContext) {
        const {conditions} = this;
        const length = conditions.length;
        for (let i = 0; i < length; i++) {
            const condition = conditions[i];
            if (!condition.match(routingStateContext)) {
                return false;
            }
        }
        return true;
    }

    mutate(routingStateContext) {
        const {conditions} = this;
        const length = conditions.length;
        for (let i = 0; i < length; i++) {
            const condition = conditions[i];
            condition.mutate(routingStateContext);
        }
        routingStateContext.pushRoute(this);
    }

    async process(context) {
        return this.processor.process(context);
    }
}
