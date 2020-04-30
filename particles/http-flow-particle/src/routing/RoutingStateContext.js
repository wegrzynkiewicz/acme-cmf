const removeSlashesRegExp = new RegExp('^\\/+|\\/+$', 'giu');

export class RoutingStateContext {

    constructor({method, segments}) {
        this.method = method;
        this.segments = [...segments];
        this.routes = [];
    }

    pushRoute(route) {
        this.routes.push(route);
    }

    static createFromRequest(request) {
        const separatedWithSlashes = request.url.replace(removeSlashesRegExp, '');
        const segments = separatedWithSlashes.length === 0 ? [] : separatedWithSlashes.split('/');
        const routingStateContext = new RoutingStateContext({
            method: request.method,
            segments,
        });
        return routingStateContext;
    }
}
