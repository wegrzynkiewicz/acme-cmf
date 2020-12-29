export class AppResolverProcessor {

    constructor({appRepository, httpManager, name}) {
        this.appRepository = appRepository;
        this.httpManager = httpManager;
        this.name = name;
    }

    async process(serviceLocator, context) {
        const {serviceRegistry, request} = context;
        const app = this.appRepository.findByRequest(request);

        serviceRegistry.registerService({
            key: 'app',
            service: app,
        });

        const processor = this.httpManager.getProcessor(app.processor);

        return await processor.process(serviceLocator, context);
    }
}
