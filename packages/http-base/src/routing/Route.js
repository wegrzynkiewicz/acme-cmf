export class Route {

    constructor({conditions = [], processor}) {
        this.conditions = [...conditions];
        this.processor = processor;
    }

    match(context) {
        for (const condition of this.conditions) {
            if (condition.match(context) === false) {
                return false;
            }
        }
        return true;
    }

    async process(serviceLocator, context) {
        return await this.processor.process(serviceLocator, context);
    }
}
