import {appSchema} from './appSchema';
import {AppProcessorRegistry} from './AppProcessorRegistry';

export class AppParticle {

    onPreInitServices({serviceRegistry}) {
        serviceRegistry.registerService({
            key: 'appProcessorRegistry',
            service: new AppProcessorRegistry(),
        });
    }

    onInitSchemas({schemaRegistry}) {
        schemaRegistry.registerSchema(appSchema);
    }
}
