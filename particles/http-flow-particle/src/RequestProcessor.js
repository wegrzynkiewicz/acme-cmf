export class RequestProcessor {

    constructor({name, router, serviceLocator}) {
        this.contexts = new Set();
        this.router = router;
        this.serviceLocator = serviceLocator;
    }

    processRequest({server, request, response}) {
        const childServiceLocator = this.serviceLocator.createChild();
        childServiceLocator.set('server', server);
        childServiceLocator.set('request', request);
        childServiceLocator.set('response', response);
        this.contexts.add(childServiceLocator);
    }
}
