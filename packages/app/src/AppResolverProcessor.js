export class AppResolverProcessor {

    constructor({name, appProcessorRegistry, appRepository}) {
        this.appProcessorRegistry = appProcessorRegistry;
        this.appRepository = appRepository;
        this.name = name;
    }

    async process(serviceLocator, context) {
        const {serviceRegistry, request} = context;
        const app = this.appRepository.findByRequest(request);

        serviceRegistry.registerService({
            key: 'app',
            service: app, // TODO:
        });

        const processor = this.appProcessorRegistry.getAppProcessor(app.processor);

        return await processor.process(serviceLocator, context);
    }
}
