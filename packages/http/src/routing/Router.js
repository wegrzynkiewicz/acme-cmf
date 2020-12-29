export class Router {

    constructor({name}) {
        this.name = name;
        this.routes = new Set();
    }

    registerRoute(route) {
        this.routes.add(route);
    }

    async process(serviceLocator, context) {
        const {request} = context;
        for (const route of this.routes.values()) {
            if (route.match({request}) === true) {
                return await route.process(serviceLocator, context);
            }
        }
        throw new Error('Not found valid route.');
    }
}
