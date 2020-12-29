import {applicationSchema} from './applicationSchema';

export class ApplicationsParticle {

    onPreInitServices({serviceRegistry}) {
        serviceRegistry.registerService({
            key: 'applicationProcessorRegistry',
            service: new ApplicationProcessorRegistry(),
        });
    }

    onInitSchemas({schemaRegistry}) {
        schemaRegistry.registerSchema(applicationSchema);
    }
}
