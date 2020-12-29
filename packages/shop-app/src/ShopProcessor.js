export class ShopProcessor {

    constructor({name}) {
        this.name = name;
    }

    async process(serviceLocator, {response}) {
        response.end('Shop content');
    }
}
