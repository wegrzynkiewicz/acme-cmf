import {Processor} from '../flow/Processor';

export class Router extends Processor {

    constructor({name}) {
        super({name});
        this.routeMap = new Map();
        this.routes = [];
    }

    registerRoute(route) {
        this.routes.push(route);
        this.routeMap.set(route.name, route);
    }

    async process(context) {
        let selectedRoute = null;
        const {routes} = this;
        const length = routes.length;

        const routingStateContext = context.get('routingStateContext');

        for (let i = 0; i < length; i++) {
            const route = routes[i];
            if (route.match(routingStateContext)) {
                selectedRoute = route;
                break;
            }
        }

        if (selectedRoute === null) {
            const response = context.get('response');
            response.end('404');
            return Promise.resolve();
        }

        selectedRoute.mutate(routingStateContext);
        const promise = await selectedRoute.process(context);

        return promise;
    }
}
